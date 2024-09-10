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
    companyId: UUID
    companyUserId: UUID
    company: str
    title: str
    location: str
    salary: str
    description: str
    techStack: str
    yearsNeeded: int
    datePosted: datetime
    contract: bool
    remote: Optional[bool]
    hybrid: Optional[bool]
    daysInOffice: Optional[int]
    numApplicants: Optional[int]
    daysExpire: Optional[int]
    numAppExpire: Optional[int]

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True

# -----THE FOLLOWING MODELS ARE FOR COMPANY USER DISPLAY-----
# dashboard display
class CompanyDashboardListingModel(BaseModel):
    id: str #changed from UUID to str, may cause issues
    companyUserId: str
    company: str
    title: str
    location: str
    salary: str
    techStack: str
    yearsNeeded: int
    datePosted: datetime
    contract: bool
    remote: Optional[bool]
    hybrid: Optional[bool]

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True

class CompanyDashboardListingWrapperModel(BaseModel):
    listings: List[CompanyDashboardListingModel]
    count: int

# listing submitted/edited
class CompanyListingRequestModel(BaseModel):
    companyUserId: str
    companyId: str
    title: str
    location: str
    salary: str
    description: str
    techStack: str
    yearsNeeded: int
    contract: bool
    remote: Optional[bool]
    hybrid: Optional[bool]
    daysInOffice: Optional[int]
    daysExpire: Optional[int]
    numAppExpire: Optional[int]

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True

# single listing display
class CompanyListingResponseModel(BaseModel):
    id: str #changed from UUID to str, may cause issues
    companyUserId: str #changed from UUID to str, may cause issues
    company: str
    title: str
    location: str
    salary: str
    description: str
    techStack: str
    yearsNeeded: int
    datePosted: datetime
    contract: bool
    remote: Optional[bool]
    hybrid: Optional[bool]
    daysInOffice: Optional[int]
    numApplicants: Optional[int]
    daysExpire: Optional[int]
    numAppExpire: Optional[int]

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True

class CompanyListingWrapperModel(BaseModel):
    listing: CompanyListingResponseModel

def transform_to_company_response_model(listing: dict) -> CompanyListingResponseModel:
    return CompanyListingResponseModel(
        id = str(listing.get('_id')),
        companyUserId = str(listing.get('companyUserId')),
        company = listing.get('company'),
        title = listing.get('title'),
        location = listing.get('location'),
        salary = listing.get('salary'),
        description = listing.get('description'),
        techStack = listing.get('techStack'),
        yearsNeeded = listing.get('yearsNeeded'),
        datePosted = listing.get('datePosted'),
        contract = listing.get('contract'),
        remote = listing.get('remote'),
        hybrid = listing.get('hybrid'),
        daysInOffice = listing.get('daysInOffice'),
        numApplicants = listing.get('numApplicants'),
        daysExpire = listing.get('daysExpire'),
        numAppExpire = listing.get('numAppExpire')
    )
def transform_to_company_dashboard_model(listing: dict) -> CompanyDashboardListingModel:
    return CompanyDashboardListingModel(
        id = str(listing.get('_id')),
        companyUserId = str(listing.get('companyUserId')),
        company = listing.get('company'),
        title = listing.get('title'),
        location = listing.get('location'),
        salary = listing.get('salary'),
        techStack = listing.get('techStack'),
        yearsNeeded = listing.get('yearsNeeded'),
        datePosted = listing.get('datePosted'),
        contract = listing.get('contract'),
        remote = listing.get('remote'),
        hybrid = listing.get('hybrid'),
    )

# -----THE FOLLOWING MODELS ARE FOR USER DISPLAY-----
# dashboard display
class UserDashboardListingModel(BaseModel):
    id: str #changed from UUID to str, may cause issues
    company: str
    title: str
    location: str
    salary: str
    techStack: str
    yearsNeeded: int
    datePosted: datetime
    remote: Optional[bool]
    hybrid: Optional[bool]

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True

# single listing display
class UserListingResponseModel(BaseModel):
    id: str #changed from UUID to str, may cause issues
    companyId: str #changed from UUID to str, may cause issues
    company: str
    title: str    
    location: str
    salary: str
    description: str
    techStack: str
    yearsNeeded: int
    datePosted: datetime
    contract: bool
    remote: Optional[bool]
    hybrid: Optional[bool]
    daysInOffice: Optional[int]
    numApplicants: Optional[int]
    daysExpire: Optional[int]
    numAppExpire: Optional[int]

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True

def transform_to_user_response_model(listing: dict) -> UserListingResponseModel:
    return UserListingResponseModel(
        id = str(listing.get('_id')),
        companyId = str(listing.get('companyId')),
        company = listing.get('company'),
        title = listing.get('title'),
        location = listing.get('location'),
        salary = listing.get('salary'),
        description = listing.get('description'),
        techStack = listing.get('techStack'),
        yearsNeeded = listing.get('yearsNeeded'),
        datePosted = listing.get('datePosted'),
        contract = listing.get('contract'),
        remote = listing.get('remote'),
        hybrid = listing.get('hybrid'),
        daysInOffice = listing.get('daysInOffice'),
        numApplicants = listing.get('numApplicants'),
        daysExpire = listing.get('daysExpire'),
        numAppExpire = listing.get('numAppExpire')
    )