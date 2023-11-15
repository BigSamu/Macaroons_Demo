import secrets
from typing import Optional

from pathlib import Path
from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    # DOMAIN SETTINGS
    NEXT_PUBLIC_CLIENT_DOMAIN_URL_PRODUCTION: str

    # PATH SETTINGS
    API_URL_PREFIX: str

    # MACAROON SETINGS
    MACAROON_SECRET_KEY: str
    # secrets.token_urlsafe(32)

    # DATABASE SETTINGS
    POSTGRES_USER: Optional[str] = None # Database User - Production
    POSTGRES_PASSWORD: Optional[str] = None # Database Password - Production
    POSTGRES_HOST: Optional[str] = None # Database Host - Production
    POSTGRES_DATABASE: Optional[str] = None # Database Name - Production

    SQLITE_URL: Optional[str] = None # Database Location - Development

    # ENVIRONMENT SETTINGS
    ENVIRONMENT: str

    class Config:
        env_file = ".env"
        extra = 'allow'


settings = Settings()
