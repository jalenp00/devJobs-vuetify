from fastapi import APIRouter, Query
from service.company.company_service import *
from util.id_conversion import *
from db.config import db, settings
from db.user_models import *
from datetime import datetime
from uuid import uuid4, UUID
from logger_config import logger
from util.password_converter import *
from bson.binary import Binary
from db.listing_models import *
from validation.ErrorModel import ErrorModel
from typing import Union

router = APIRouter()

listing_collection = db[settings.listing_collection]

logger.info(f"this is how you can log")


# id - DONE
# companyId - DONE
# companyUserId - DONE
# company - DONE
# datePosted - DONE

@router.post('/', response_model=Union[CompanyListingWrapperModel, ErrorModel])
async def create_listing(listing: CompanyListingRequestModel):
    logger.info(f'Create listing has been called. Request is: {listing}')
    # Get user input
    listing_doc = listing.model_dump(by_alias=True)

    # Get company name from company id
    company_name = await get_company_name_from_company_id(listing_doc['companyId'])

    if isinstance(company_name, ErrorModel):
        return company_name
    
    # Generate UUID
    listing_doc['_id'] = uuid4()

    # Convert company and company user ids to UUID for storage
    companyId = UUID(listing_doc['companyId'])
    listing_doc['companyId'] = companyId
    userId = UUID(listing_doc['companyUserId'])
    listing_doc['companyUserId'] = userId

    # Set the company info returned
    listing_doc['company'] = company_name

     # Generate create date
    listing_doc['datePosted'] = datetime.now()

    # Send listing_doc to db
    result = await listing_collection.insert_one(listing_doc)

    # Get user and transform to ResponseModel for frontend
    created_listing = await listing_collection.find_one({'_id': result.inserted_id})
    response_listing = transform_to_company_response_model(created_listing)

    return CompanyListingWrapperModel(listing=response_listing)

@router.get('/companyId', response_model=Union[CompanyDashboardListingWrapperModel, ErrorModel])
async def get_all_listings_by_company_id(id: str):

    uuid_id = UUID(id)
    listings = await listing_collection.find({'companyId': uuid_id}).to_list(length=None)

    #listing_models = [CompanyDashboardListingModel(**listing) for listing in listings]
    listing_models = []

    for listing in listings:
        listing_models.append(transform_to_company_dashboard_model(listing))

    response = CompanyDashboardListingWrapperModel(listings=listing_models, count=len(listing_models))
    return response
        