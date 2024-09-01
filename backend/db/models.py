from pydantic import BaseModel, Field, field_validator
from typing import List, Optional
from uuid  import UUID, uuid4
from datetime import datetime

 
# location: city, ST
# salary: $100,000 - $150,000
# postedDate: MM/DD 
# numAppExpires: # of applications it can take
class ListingModel(BaseModel):
    id: UUID = Field(uuid4(), alias="_id")
    title: str
    company: str
    company_id: UUID
    location: str
    salary: str
    description: str
    techStack: str
    yearsNeeded: int
    remote: bool
    hybrid: bool
    contract: bool
    daysInOffice: Optional[int]
    datePosted: datetime
    numApplicants: int
    daysExpire: Optional[int]
    numAppExpire: Optional[int]

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True

# Holds ids of the job listings
# Profile holds things like profile picture, settings and preferences
class UserModel(BaseModel):
    id: UUID = Field(uuid4(), alias="_id")
    name: str
    email: str
    hashed_password: str
    appliedJobs: Optional[List[uuid4]]
    savedJobs: Optional[List[uuid4]]
    profile: Optional[dict]

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True

# appliedJobs: holds ids of the listing
# savedJobs: holds ids of the listing
# reviews: rating out of 5 - management approval - review - location - job title
# status: public or private
# round: funding round
class CompanyModel(BaseModel):
    id: UUID = Field(uuid4(), alias="_id")
    name: str
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

class CompanyUserModel(BaseModel):
    id: UUID = Field(uuid4(), alias="_id")
    name: str
    email: str
    position: str
    admin: bool
    companyId: UUID
    settings: dict

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True

class ReviewModel(BaseModel):
    id: UUID = Field(uuid4(), alias="_id")
    rating: int
    description: str
    mangementScore: Optional[int]
    pros: str
    cons: str
    datePosted: datetime
    companyId: UUID
    userId: UUID

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
