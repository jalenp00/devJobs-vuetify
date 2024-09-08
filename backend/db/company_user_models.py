from pydantic import BaseModel, Field
from typing import List, Optional
from uuid  import UUID, uuid4
from datetime import datetime

class Model(BaseModel):
    id: UUID = Field(default_factory=uuid4, alias="id")
    companyId: UUID
    name: str
    email: str
    password: str
    createDate: datetime
    position: Optional[str] = None
    admin: Optional[bool] = None
    permissions: Optional[dict] = {}
    settings: Optional[dict] = {}

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True

class RequestModel(BaseModel):
    companyId: str
    name: str
    email: str
    password: str

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True

class ResponseModel(BaseModel):
    id: str
    companyId: str
    name: str
    email: str
    createDate: datetime
    position: Optional[str] = None
    admin: Optional[bool] = None
    permissions: Optional[dict] = []
    settings: Optional[dict] = {}

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True

class WrapperModel(BaseModel):
    user: ResponseModel

def transform_to_response_model(user: dict) -> ResponseModel:
    return ResponseModel(
        id=str(user.get('_id')),
        companyId=str(user.get('companyId')),
        name=user.get('name'),
        email=user.get('email'),
        createDate=user.get('createDate'),
        position=user.get('position') or None,
        admin=user.get('admin') or None,
        permissions=user.get('permissions') if user.get('permissions') is not None else {}
    )