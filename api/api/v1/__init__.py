from fastapi import APIRouter

from api.api.v1 import resources, users, auth

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(resources.router, prefix="/resources", tags=["resources"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
