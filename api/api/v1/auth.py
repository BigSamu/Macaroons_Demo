from typing import Dict

from fastapi import APIRouter, HTTPException, Request, Response, status
from fastapi.param_functions import Depends
from fastapi.security.oauth2 import OAuth2PasswordRequestForm

from dateutil import parser

from sqlalchemy.orm.session import Session

from api import schemas, crud
from api.core import (
    create_macaroon_access_token,
    restrict_macaroon_access_token,
)
from api.api.deps import get_db, get_access_token

router = APIRouter()

@router.post("/login", response_model=schemas.UserResponse)
def login(
    response: Response,
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):

    user_authenticated = crud.user.authenticate(
        db, email=form_data.username, password=form_data.password
    )

    if not user_authenticated:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
        )

    access_token = create_macaroon_access_token(identifier=user_authenticated.id)
    print("Macaroon minted")

    # 86400000
    response.set_cookie(
        key="access_token",
        value=f"Bearer {access_token}",
        max_age=86400000,
        httponly=True,
        samesite="strict",
    )  # set HttpOnly cookie in response
    response.set_cookie(
        key="shared_token",
        value=f"no",
        max_age=86400000,
        httponly=False,
        samesite="strict",
    )
    return user_authenticated


@router.get("/logout")
def logout(response: Response):
    response.delete_cookie(key="access_token", httponly=True)
    response.delete_cookie(key="shared_token", httponly=True)
    return {"message": "Succesfully Log Out"}


@router.post("/token/macaroon/add_caveats")
def mint_restricted_macaroon(
    *, caveats: schemas.CaveatsRequest, access_token: Dict = Depends(get_access_token)
):

    caveats = caveats.dict()
    access_token = restrict_macaroon_access_token(
        access_token=access_token, caveats=caveats
    )

    return access_token
