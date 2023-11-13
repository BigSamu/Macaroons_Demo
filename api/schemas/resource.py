from typing import Optional, Dict

from pydantic import BaseModel


class ResourceCreate(BaseModel):
    title: str
    description: str
    image_url: str


class ResourceUpdate(BaseModel):
    title: Optional[str]
    description: Optional[str]
    image_url: Optional[str]


class ResourceResponse(BaseModel):
    id: int
    title: str
    description: str
    image_url: str

    class Config:
        from_attributes = True
