from pydantic import BaseModel, Field
from typing import List, Optional
from uuid  import UUID, uuid4
from datetime import datetime


# Holds ids of the job listings
# Profile holds things like profile picture, settings and preferences
class UserModel(BaseModel):
    id: UUID = Field(default_factory=uuid4, alias="_id")
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
class UserRequestModel(BaseModel):
    name: str
    email: str
    password: str

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True


# Used for...
class UserResponseModel(BaseModel):
    id: str = Field(..., alias="_id")
    name: str
    email: str

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True

# Used for login
class UserRequestLogin(BaseModel):
    email: str
    password: str

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True