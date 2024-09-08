from pydantic import BaseModel, Field
from typing import List, Optional
from uuid  import UUID, uuid4
from datetime import datetime

# appliedJobs: holds ids of the listing
# savedJobs: holds ids of the listing
# reviews: rating out of 5 - management approval - review - location - job title
# status: public or private
# round: funding round
class Model(BaseModel):
    id: UUID = Field(default_factory=uuid4, alias="id")
    name: str
    createDate: datetime
    headquarters: str
    description: str
    numEmployees: int
    yearStarted: datetime
    industry: str
    locations: Optional[str]
    type: str
    round: Optional[str]

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True

class ResponseModel(BaseModel):
    id: UUID
    name: str
    createDate: datetime
    headquarters: Optional[str] = None
    description: Optional[str] = None
    numEmployees: Optional[int] = None
    yearStarted: Optional[datetime] = None
    industry: Optional[str] = None
    locations: Optional[str] = None
    type: Optional[str] = None
    round: Optional[str] = None

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True

class RequestModel(BaseModel):
    name: str

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True

class WrapperModel(BaseModel):
    user: ResponseModel

def transform_to_response_model(company: dict) -> ResponseModel:
    return ResponseModel(
        id=str(company.get('_id')),
        name=company.get('name'),
        createDate=company.get('createDate'),
        headquarters=company.get('headquarters') or None,
        description=company.get('description') or None,
        numEmployees=company.get('numEmployees') or None,
        yearStarted=company.get('yearStarted') or None,
        industry=company.get('industry') or None,
        locations=company.get('locations') or None,
        type=company.get('type') or None,
        round=company.get('round') or None,
    )