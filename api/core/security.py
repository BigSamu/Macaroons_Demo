from typing import Optional, Dict, List
from datetime import datetime, timedelta, timezone
from urllib.parse import unquote

from fastapi import HTTPException, Request, status
from fastapi.security import OAuth2
from fastapi.openapi.models import OAuthFlows as OAuthFlowsModel
from fastapi.security.utils import get_authorization_scheme_param

from pymacaroons import Macaroon, Verifier
from pymacaroons.exceptions import MacaroonDeserializationException
from passlib.context import CryptContext
from dateutil import parser

from api.core.config import settings
from api.utils import first_party_caveats_parser

pwd_cxt = CryptContext(schemes="bcrypt", deprecated="auto")


# --------------------------------------------------------------------------
# PASSWORD HASHING METHODS
# --------------------------------------------------------------------------


def hash_password(plain_password: str):
    return pwd_cxt.hash(plain_password)


def verify_password(plain_password: str, hashed_password: str):
    return pwd_cxt.verify(plain_password, hashed_password)


# --------------------------------------------------------------------------
# MACAROON METHODS
# --------------------------------------------------------------------------


def create_macaroon_access_token(
    identifier: int, caveats: Optional[Dict] = None
) -> str:

    root_macaroon = Macaroon(
        location=settings.NEXT_PUBLIC_CLIENT_DOMAIN_URL_PRODUCTION, # url location
        identifier=str(identifier), # user_id
        key=settings.MACAROON_SECRET_KEY, # secret key
    )
    if caveats is not None:
        first_party_caveats: List = first_party_caveats_parser(caveats)
        for each in first_party_caveats:
            root_macaroon.add_first_party_caveat(each)

    encoded_macaroon = root_macaroon.serialize()
    return encoded_macaroon


def verify_macaroon_access_token(
    access_token: Dict, credentials_exception: HTTPException
) -> str:

    # Try to decode macaroon
    try:
        macaroon = Macaroon.deserialize(access_token["value"])
        user_id = macaroon.identifier

        # If no sender or receiver raise credentials exception (one passed as argument)
        if user_id is None:
            raise credentials_exception

    # If error found during decoding Macaroon (mismatch in signature), raise credentials
    # exception (one passed as argument)
    except (MacaroonDeserializationException, Exception):
        raise credentials_exception

    # If everything Ok, return username id
    return user_id


def restrict_macaroon_access_token(access_token: Dict, caveats: Optional[Dict]) -> str:

    macaroon = Macaroon.deserialize(access_token["value"])
    if caveats is not None:
        first_party_caveats: List = first_party_caveats_parser(caveats)
        for each in first_party_caveats:
            macaroon.add_first_party_caveat(each)
    encoded_macaroon = macaroon.serialize()
    return encoded_macaroon


def verify_access_to_shared_resource(access_token: Dict, resource_id: int) -> str:

    forbidden_exception = HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail=f"Not enough priviledge to access resource",
        headers={"WWW-Authenticate": "Bearer"},
    )

    # Prepare validator functions for macaroon verifier:
    def resource_access_validator(predicate: str) -> bool:
        predicateList = []
        if "OR" in predicate:
            predicateList = predicate.split(" OR ")
        else:
            predicateList.append(predicate)

        for each in predicateList:
            if each.split(" = ")[0] != "resource_ref_number":
                return False
            elif each.split(" = ")[1] == str(resource_id):
                return True
        return False

    def expiration_access_validator(predicate: str) -> bool:
        if "<" in predicate and predicate.split(" < ")[0] == "expiration":
            expiration_timestamp = predicate.split(" < ")[1]
            # expiration_datetime = datetime.fromisoformat(expiration_timestamp)
            expiration_datetime = parser.parse(expiration_timestamp)
            if expiration_datetime > datetime.now(timezone.utc):
                return True
        return False

    # Prepare macaroon verifier
    macaroon_verifier = Verifier()
    macaroon_verifier.satisfy_general(resource_access_validator)
    macaroon_verifier.satisfy_general(expiration_access_validator)

    macaroon = Macaroon.deserialize(access_token["value"])
    root_username_id = macaroon.identifier

    try:
        macaroon_verifier.verify(macaroon, settings.MACAROON_SECRET_KEY)
    except:
        raise forbidden_exception

    return root_username_id


# --------------------------------------------------------------------------
# OAUTH2 SCHEMES
# --------------------------------------------------------------------------

#  *** IMPORTANT TO REFERENCE ***
# CODE FROM
# https://www.fastapitutorial.com/blog/fastapi-jwt-httponly-cookie/
class OAuth2PasswordBearerWithCookie(OAuth2):
    def __init__(
        self,
        tokenUrl: str,
        scheme_name: Optional[str] = None,
        scopes: Optional[Dict[str, str]] = None,
        auto_error: bool = True,
    ):
        if not scopes:
            scopes = {}
        flows = OAuthFlowsModel(password={"tokenUrl": tokenUrl, "scopes": scopes})
        super().__init__(flows=flows, scheme_name=scheme_name, auto_error=auto_error)

    async def __call__(self, request: Request) -> Optional[dict]:

        authorization: str = request.cookies.get(
            "access_token"
        )  # changed to accept access token from httpOnly Cookie

        if authorization is not None:
            authorization = unquote(authorization)

        scheme, access_token = get_authorization_scheme_param(authorization)
        shared_token: bool = request.cookies.get("shared_token") == "yes"

        if not authorization or scheme.lower() != "bearer":
            if self.auto_error:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Not authenticated",
                    headers={"WWW-Authenticate": "Bearer"},
                )
            else:
                return None

        return {"value": access_token, "isShared": shared_token}


# class OAuth2PasswordBearerWithCookie(OAuth2):
#     def __init__(
#         self,
#         tokenUrl: str,
#         scheme_name: str = None,
#         scopes: dict = None,
#         auto_error: bool = True,
#     ):
#         if not scopes:
#             scopes = {}
#         flows = OAuthFlowsModel(password={"tokenUrl": tokenUrl, "scopes": scopes})
#         super().__init__(flows=flows, scheme_name=scheme_name, auto_error=auto_error)

#     async def __call__(self, request: Request) -> Optional[str]:
#         header_authorization: str = request.headers.get("access_token")
#         cookie_authorization: str = request.cookies.get("access_token")


#         header_scheme, header_param = get_authorization_scheme_param(
#             header_authorization
#         )
#         cookie_scheme, cookie_param = get_authorization_scheme_param(
#             cookie_authorization
#         )

#         if header_scheme.lower() == "bearer":
#             authorization = True
#             scheme = header_scheme
#             param = header_param

#         elif cookie_scheme.lower() == "bearer":
#             authorization = True
#             scheme = cookie_scheme
#             param = cookie_param

#         else:
#             authorization = False

#         if not authorization or scheme.lower() != "bearer":
#             if self.auto_error:
#                 raise HTTPException(
#                     status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated"
#                 )
#             else:
#                 return None
#         return param
