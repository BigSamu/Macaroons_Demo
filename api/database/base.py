# ################################ DISCLAIMER #################################
# Code mainly obteined from third-party:
# Author: Sebastian Ramirez
# Creation Date: 20 April 2020
# Purpose: set up Base class for SQLAlchemy objects and name of tables in DB
# Source: https://github.com/tiangolo/full-stack-fastapi-postgresql/blob/master/%7B%7Bcookiecutter.project_slug%7D%7D/backend/app/app/db/base_class.py
# Changes: Some minor changes to define tables with plural names
# #############################################################################

from typing import Any

from sqlalchemy.ext.declarative import as_declarative, declared_attr


@as_declarative()
class Base:
    id: Any
    __name__: str

    # Generate __tablename__ automatically
    @declared_attr
    def __tablename__(self) -> str:
        return self.__name__.lower() + "s"
