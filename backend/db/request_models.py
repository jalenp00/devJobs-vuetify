from pydantic import BaseModel, Field
from typing import List, Optional
from uuid  import UUID, uuid4
from datetime import datetime

 
# location: city, ST
# salary: $100,000 - $150,000
# postedDate: MM/DD 
# numAppExpires: # of applications it can take
class ListingRequestModel(BaseModel):
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



class ReviewRequestModel(BaseModel):
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
