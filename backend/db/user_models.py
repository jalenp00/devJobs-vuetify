from pydantic import BaseModel, Field
from typing import List, Optional
from uuid  import UUID, uuid4
from datetime import datetime


# Holds ids of the job listings
# Profile holds things like profile picture, settings and preferences
class Model(BaseModel):
    id: UUID = Field(default_factory=uuid4, alias="id")
    name: str
    email: str
    hashed_password: str
    createDate: datetime
    appliedJobs: Optional[List[UUID]] = []
    savedJobs: Optional[List[UUID]] = []
    profile: Optional[dict] = {}

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        exclude = {"hashed_password"}

# Used for...
class RequestModel(BaseModel):
    name: str
    email: str
    password: str

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True


# Used for...
class ResponseModel(BaseModel):
    id: str #changed from UUID to str, may cause issues
    name: str
    email: str
    createDate: datetime
    appliedJobs: Optional[List[UUID]] = []
    savedJobs: Optional[List[UUID]] = []
    profile: Optional[dict] = {}

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True

# Used for login
class RequestLogin(BaseModel):
    email: str
    password: str

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True

class WrapperModel(BaseModel):
    user: ResponseModel

def transform_to_response_model(user: dict) -> ResponseModel:
    return ResponseModel(
        id=str(user.get('_id')),
        name=user.get('name'),
        email=user.get('email'),
        createDate=user.get('createDate'),
        appliedJobs=user.get('appliedJobs') or [],
        savedJobs=user.get('savedJobs') or [],
        profile=user.get('profile') if user.get('profile') is not None else {}
    )