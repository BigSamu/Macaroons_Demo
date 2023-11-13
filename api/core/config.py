import secrets

from pathlib import Path
from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    # PATH SETTINGS
    API_URL_PREFIX: str

    # MACAROON SETINGS
    MACAROON_SECRET_KEY: str = "secret"
    # secrets.token_urlsafe(32)

    # CSRF SETINGS
    CSRF_SECRET_KEY: str = secrets.token_urlsafe(32)

    # DATABASE SETTINGS
    POSTGRES_USER: str = None # Database User - Production
    POSTGRES_PASSWORD: str = None # Database Password - Production
    POSTGRES_HOST: str = None # Database Host - Production
    POSTGRES_DATABASE: str = None # Database Name - Production

    SQLITE_URL: str = None # Database Location - Development

    # ENVIRONMENT SETTINGS
    ENVIRONMENT: str = "development"  # Set this in your .env file

    class Config:
        env_file = ".env"
        extra = 'allow'


settings = Settings()
