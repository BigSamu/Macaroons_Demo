from typing import Optional, Dict

from pydantic import BaseModel


class CaveatsRequest(BaseModel):
    resources: Dict
    timeout: int
