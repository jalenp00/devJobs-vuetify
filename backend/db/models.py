from pydantic import BaseModel, Field
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
    datePosted: datetime
    numApplicants: int
    daysInOffice: Optional[int] = None
    daysExpire: Optional[int] = None
    numAppExpire: Optional[int] = None

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
    pros: str
    cons: str
    datePosted: datetime
    companyId: UUID
    userId: UUID
    mangementScore: Optional[int] = None
    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
