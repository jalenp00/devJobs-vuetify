from fastapi import APIRouter, HTTPException
from id_conversion import *
from db.config import db, settings
from db.models import UserModel
from db.requestModels import UserRequestModel
from datetime import datetime
from uuid import uuid4
from logger_config import logger
import password_converter as password_converter

router = APIRouter()

user_collection = db[settings.user_collection]

@router.post('/', response_model=UserModel)
async def create_user(user: UserRequestModel):
    
    password = user.password
    user_doc = user.model_dump(exclude='password')

    # Raw datetime
    user_doc['createDate'] = datetime.now()

    # Store UUID as Binary  [id_conversion.py]
    user_doc['_id'] = uuid_to_binary(uuid4())

    # Hashes password
    user_doc['hashed_password'] = password_converter.hash_password(password)


    logger.info('user_doc', user_doc)
    result = await user_collection.insert_one(user_doc)

    user_doc['id'] = str(result.inserted_id)
    return user_doc
