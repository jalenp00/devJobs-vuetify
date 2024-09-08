from fastapi import APIRouter
from util.id_conversion import *
from db.config import db, settings
from db.company_models import *
from datetime import datetime
from uuid import uuid4
from logger_config import logger
from bson import Binary
from service.company.company_service import *
from typing import Union
from db.company_models import RequestModel, WrapperModel, transform_to_response_model
from validation.ErrorModel import ErrorModel


router = APIRouter()

company_collection = db[settings.company_collection]

@router.post('/', response_model=Union[WrapperModel, ErrorModel])
async def create_company(company: RequestModel):

    company_doc = company.model_dump()

    if (await invalidName(company_doc['name'])):
        return ErrorModel(error="A company already has that name")
    
    company_doc['_id'] = uuid4()
    company_doc['createDate'] = datetime.now()
    
    result = await company_collection.insert_one(company_doc)

    created_company = await company_collection.find_one({'_id': result.inserted_id})
    response_company = transform_to_response_model(created_company)

    return WrapperModel(company=response_company)