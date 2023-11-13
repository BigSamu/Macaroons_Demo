from typing import Optional, List

from sqlalchemy.orm import Session

from api.crud.base import CRUDBase
from api.models import Resource
from api.schemas import ResourceResponse, ResourceCreate, ResourceUpdate

class CRUDResource(CRUDBase[Resource, ResourceCreate, ResourceUpdate]):
    # Declare model specific CRUD operation methods.
    def get_one_by_title(self, db: Session, title: str) -> Optional[Resource]:
        return db.query(Resource).filter(Resource.title == title).first()

resource = CRUDResource(Resource)
