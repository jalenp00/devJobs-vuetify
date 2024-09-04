from fastapi import HTTPException
from db.config import db, settings
from db.user_models import *
from password_converter import *

user_collection = db[settings.user_collection]

async def invalidEmail (email: str):
    duplicate_email = await user_collection.find_one({'email': email})
    
    if (duplicate_email is not None):
        return True
    
    return False

async def validLogin (email: str, password: str):
    real_user = await user_collection.find_one({'email':email})

    if real_user is None:
        raise HTTPException(status_code=404, detail="No user with that email")
    
    if not verify_password(password, real_user['hashed_password']):
        raise HTTPException(status_code=500, detail="Wrong password")
    
    return real_user