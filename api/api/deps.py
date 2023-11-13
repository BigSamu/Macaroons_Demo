from typing import Generator, Union, Dict

from fastapi import HTTPException, status
from fastapi.param_functions import Depends
from sqlalchemy.orm import Session

from api.core import (
    settings,
    verify_macaroon_access_token,
    OAuth2PasswordBearerWithCookie,
)

from api.database.session import SessionLocal
from api import crud, models

oauth2_scheme = OAuth2PasswordBearerWithCookie(
    tokenUrl=f"{settings.API_URL_PREFIX}/auth/login"
)

# *******************************************************************************
# SESSION DATABASE DEPENDENCY
# *******************************************************************************


def get_db() -> Generator:
    # Create session while connection to database
    try:
        db = SessionLocal()
        yield db
    # Once finish close database session
    finally:
        db.close()


# *******************************************************************************
# AUTHENTICATION DEPENDENCY
# *******************************************************************************


def get_current_user(
    access_token: dict = Depends(oauth2_scheme), db: Session = Depends(get_db)
) -> models.User:

    # Create HTTP Exception for credentilas error
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail=f"Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    user = None
    # Verify Access Token (Macaroon). If error found in verification,
    # raise credentials exception

    if not access_token["isShared"]:
        user_id = verify_macaroon_access_token(access_token, credentials_exception)
        user = crud.user.get_one(db, user_id)

        if user is None:
            raise credentials_exception

    # If everything OK, return user object
    return user


def get_access_token(access_token: dict = Depends(oauth2_scheme)):
    # Note: this method will retrieve the access token for being use only in
    # the following endpoints: '/api/v1/auth/token/macaroon/add_caveats'
    # and /api/v1/records/load_data_and_submit_new_acces_records'
    return access_token
