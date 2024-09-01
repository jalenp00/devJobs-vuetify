from fastapi import APIRouter, HTTPException
from bson import ObjectId
from db.config import db, settings
from db.models import UserModel
import logging

router = APIRouter()

# using uvicorns logger
logger = logging.getLogger("uvicorn")

user_collection = db[settings.user_collection]

@router.post("/", response_model=UserModel)
async def create_user(user: UserModel):
    user_doc = user.model_dump()
    result = await user_collection.insert_one(user_doc)
    user_doc['id'] = result.inserted_id
    return user_doc