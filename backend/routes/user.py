from fastapi import APIRouter, HTTPException
from id_conversion import *
from db.config import db, settings
from db.user_models import *
from datetime import datetime
from uuid import uuid4
from logger_config import logger
from password_converter import *
from bson import Binary
from service.user.userService import *

router = APIRouter()

user_collection = db[settings.user_collection]


@router.post('/', response_model=UserResponseModel)
async def create_user(user: UserRequestModel):
    
    password = user.password
    user_doc = user.model_dump(exclude='password')

    if (await invalidEmail(user_doc['email'])):
        raise HTTPException(status_code=500, detail="Email already in use.")
    
    # Raw datetime
    user_doc['createDate'] = datetime.now()

      # Generate and store UUID as Base64
    uuid_obj = uuid4()
    user_doc['_id'] = Binary(base64.b64encode(uuid_obj.bytes))
    

    # Hashes password
    user_doc['hashed_password'] = hash_password(password)

    result = await user_collection.insert_one(user_doc)

    user_doc['id'] = uuid_to_base64(uuid_obj)

    return UserResponseModel(**user_doc)

@router.post('/login', response_model=UserResponseModel)
async def login_user(user: UserRequestLogin):
    
    user_login = user.model_dump()

    if user_login is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    real_user = await validLogin(user_login['email'], user_login['password'])

    return UserResponseModel(**real_user)

@router.get('/', response_model=UserResponseModel)
async def get_user(id: str):
    try:
        id_uuid = base64_to_uuid(id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    user_doc = await user_collection.find_one({'_id': Binary(base64.b64encode(id_uuid.bytes))})

    if user_doc is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Convert the `_id` back to string if needed for the response
    user_doc['id'] = uuid_to_base64(base64_to_uuid(user_doc['_id'].decode('utf-8')))

    # Remove sensitive fields if needed
    user_doc.pop('hashed_password', None)

    return UserResponseModel(**user_doc)
