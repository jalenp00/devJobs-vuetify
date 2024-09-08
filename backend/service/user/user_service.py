from fastapi import HTTPException
from db.config import db, settings
from db.user_models import *
from util.password_converter import *
from validation.ErrorModel import ErrorModel
from logger_config import logger

user_collection = db[settings.user_collection]
company_user_collection = db[settings.company_user_collection]

async def invalidEmail (email: str, type: str):
    if (type == 'user'):
        duplicate_email = await user_collection.find_one({'email': email})
    elif (type == 'companyuser'):
        duplicate_email = await company_user_collection.find_one({'email': email})

    if (duplicate_email is not None):
        return True
    
    return False

async def validLogin (email: str, password: str, type: str):

    if (type == 'user'):
        real_user = await user_collection.find_one({'email':email})
    
    elif (type == 'companyuser'):
        real_user = await company_user_collection.find_one({'email':email})

    if real_user is None:
        return ErrorModel(error="Incorrect email and/or password")
    
    if not verify_password(password, real_user['hashed_password']):
        return ErrorModel(error="Incorrect email and/or password")
    return real_user