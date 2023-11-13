from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os

from api.core.config import settings

if settings.ENVIRONMENT == "production":
    print("Using Postgres Vercel remote database")
    POSTGRES_URL=f'postgresql://{settings.POSTGRES_USER}:{settings.POSTGRES_PASSWORD}@{settings.POSTGRES_HOST}/{settings.POSTGRES_DATABASE}'
    engine = create_engine(POSTGRES_URL)
else:
    # SQLite configuration for development
    print("Using SQLite local database")
    engine = create_engine(
        settings.SQLITE_URL,
        connect_args={"check_same_thread": False},  # Required for SQLite
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
