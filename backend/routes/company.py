from fastapi import APIRouter
from bson import ObjectId
from db.config import db, settings
from db.models import CompanyModel
import logging

router = APIRouter()

# using uvicorns logger
logger = logging.getLogger("uvicorn")

company_collection = db[settings.company_collection]

@router.post("/", response_model=CompanyModel)
async def create_company(company: CompanyModel):
    company_doc = company.model_dump()
    result = await company_collection.insert_one(company_doc)
    company_doc['id'] = result.inserted_id
    return company_doc