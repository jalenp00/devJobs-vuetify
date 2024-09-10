from fastapi import APIRouter, Query
from util.id_conversion import *
from db.config import db, settings
from db.user_models import *
from datetime import datetime
from uuid import uuid4, UUID
from logger_config import logger
from util.password_converter import *
from bson.binary import Binary
from service.user.user_service import *
from db.user_models import RequestModel, WrapperModel, RequestLogin, transform_to_response_model
from validation.ErrorModel import ErrorModel
from typing import Union

router = APIRouter()

user_collection = db[settings.user_collection]

logger.info(f"this is how you can log")

@router.post('/', response_model=Union[WrapperModel, ErrorModel])
async def create_user(user: RequestModel):

    # Get user input
    user_doc = user.model_dump(by_alias=True)

    # Check for duplicate emails
    if (await invalidEmail(user_doc['email'], 'user')):
        return ErrorModel(error="Email already in use")
    
    # Hash password
    password = user.password
    user_doc['hashed_password'] = hash_password(password)

    # Generate UUID
    user_doc['_id'] = uuid4()

    # Generate create date
    user_doc['createDate'] = datetime.now()

    # Send user_doc to db
    result = await user_collection.insert_one(user_doc)

    # Get user and transform to ResponseModel for frontend
    created_user = await user_collection.find_one({'_id': result.inserted_id})
    response_user = transform_to_response_model(created_user)

    return WrapperModel(user=response_user)

@router.get('/', response_model=Union[WrapperModel, ErrorModel])
async def get_user(id: str = Query(...)):
    
    # Convert id into UUID into hex to query
    uuid_id = UUID(id)
    
    user_doc = await user_collection.find_one({'_id': uuid_id})

    if user_doc is None:
        return ErrorModel(error='No user found')
    
    logger.info(f"user_doc: {user_doc}")

    # Transform user_doc to ResponseUser for frontend
    response_user = transform_to_response_model(user_doc)

    return WrapperModel(user=response_user)

@router.post('/login', response_model=Union[WrapperModel, ErrorModel])
async def login_user(user: RequestLogin):
    
    user_doc = user.model_dump(by_alias=True)

    if user_doc is None:
        return ErrorModel(error='No user found')
    
    result_user = await validLogin(user_doc['email'], user_doc['password'], 'user')

    if isinstance(result_user, ErrorModel):
        return ErrorModel(error=result_user.error)
    
    if isinstance(result_user, dict):  # Assuming result_user should be a dict
        response_user = transform_to_response_model(result_user)
    else:
        # Handle other cases, or raise an appropriate error
        return ErrorModel(error='Unexpected result format')
    
    response_user = transform_to_response_model(result_user)

    return WrapperModel(user=response_user)
