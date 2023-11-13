from sqlalchemy.orm import Session

from api.database.session import SessionLocal
from api.database.base import Base
from api.database.session import engine

import json

def create_tables() -> None:
    """
    Create database tables from SQLAlchemy models.
    """
    Base.metadata.create_all(bind=engine)


def init_default_values(db: Session):
    # Here you would initialize the default values
    with open("api/database/default_data.json", "r") as file:
        data = json.load(file)

    from api.crud import user as crud_user, resource as crud_resource

    # Add default users
    for user_data in data["users"]:
        if not crud_user.get_one_by_email(db, email=user_data["email"]):
            crud_user.create(db, obj_in=user_data)

    # Add default resources
    for resource_data in data["resources"]:
        if not crud_resource.get_one_by_title(db, title=resource_data["title"]):
            crud_resource.create(db, obj_in=resource_data)


def init_database():
    # This is the function called from main.py to initialize the whole database
    # Create a new database session
    db = SessionLocal()

    # Create tables
    create_tables()

    # Initialize default values
    init_default_values(db)

    # Close the session
    db.close()
