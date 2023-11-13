from typing import Any, List, Dict

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session


from api import crud, models, schemas
from api.api.deps import get_db, get_current_user, get_access_token
from api.core import verify_access_to_shared_resource

router = APIRouter()

@router.get("", response_model=List[schemas.ResourceResponse])
def read_all_resources(
    db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)
) -> Any:
    """
    Retrieve all resources.
    """
    resources = crud.resource.get_all(db)
    return resources


@router.get("/{resource_id}", response_model=schemas.ResourceResponse)
def read_one_resource(
    resource_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> Any:
    """
    Retrieve one resource by id.
    """
    resource = crud.resource.get_one(db, model_id=resource_id)
    if not resource:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"The resource with id '{resource_id}' does not exist in the system.",
        )
    return resource

@router.get("/shared/{resource_id}", response_model=schemas.ResourceResponse)
def read_one_shared_resource(
    resource_id: int,
    db: Session = Depends(get_db),
    access_token: Dict = Depends(get_access_token),
) -> Any:
    """
    Retrieve one shared resource by id using shared macaroon token.
    """

    verify_access_to_shared_resource(
            access_token = access_token,
            resource_id = resource_id)

    resource = crud.resource.get_one(db, model_id=resource_id)
    if not resource:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"The resource with id '{resource_id}' does not exist in the system.",
        )

    return resource


@router.post("", response_model=schemas.ResourceResponse)
def create_resource(
    *,
    db: Session = Depends(get_db),
    resource_in: schemas.ResourceCreate,
    current_user: models.User = Depends(get_current_user),
) -> Any:
    """
    Create new resource.
    """
    resource = crud.resource.create(db, obj_in=resource_in)
    return resource


@router.put("/{resource_id}", response_model=schemas.ResourceResponse)
def update_resource(
    *,
    resource_id: int,
    db: Session = Depends(get_db),
    resource_in: schemas.ResourceUpdate,
    current_user: models.User = Depends(get_current_user),
) -> Any:
    """
    Update existing resource.
    """
    resource = crud.resource.get_one(db, model_id=resource_id)
    if not resource:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"The resource with id '{resource_id}' does not exist in the system.",
        )
    resource = crud.resource.update(db, db_obj=resource, obj_in=resource_in)
    return resource


@router.delete("", response_model=schemas.Message)
def delete_all_resources(
    *,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> Any:
    """
    Delete all resources.
    """
    resources = crud.resource.get_all(db)
    if not resources:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"It doesn't exist any resource in the system.",
        )
    rows_deleted = crud.resource.remove_all(db)
    return {"message": f"{rows_deleted} resources were deleted."}


@router.delete("/{resource_id}", response_model=schemas.Message)
def delete_one_resource(
    *,
    resource_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> Any:
    """
    Delete one resource by id.
    """
    resource = crud.resource.get_one(db, model_id=resource_id)
    if not resource:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"The resource with id '{resource_id}' does not exist in the system.",
        )
    crud.resource.remove_one(db, model_id=resource.id)
    return {"message": f"Resource with id '{resource_id}' deleted."}
