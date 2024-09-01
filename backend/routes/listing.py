from fastapi import APIRouter
from db.config import db, settings
from db.models import ListingModel
import format_dates as date
import logging

router = APIRouter()

# using uvicorns logger
logger = logging.getLogger("uvicorn")

listing_collection = db[settings.listing_collection]

@router.post("/", response_model=ListingModel)
async def create_listing(listing: ListingModel):
    listing_doc = listing.model_dump()
    listing_doc['datePosted'] = date.get_time_dm()
    result = await listing_collection.insert_one(listing_doc)
    listing_doc['id'] = result.inserted_id 
    logger.info(listing_doc)
    return listing_doc

