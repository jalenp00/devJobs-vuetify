from bson import UuidRepresentation
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic_settings import BaseSettings 
import logging

class Settings(BaseSettings):
    mongodb_url: str = 'mongodb://localhost:27017'
    database_name: str = 'devJobsDB'
    user_collection: str = 'users'
    company_collection: str = 'companies'
    listing_collection: str = 'listings'

    class Config:
        env_file = ".env"

settings = Settings()

# using uvicorns logger
logger = logging.getLogger("uvicorn")

try:
    client = AsyncIOMotorClient(settings.mongodb_url, uuidRepresentation='standard')
    db = client[settings.database_name]
    logging.info(f"Connected to MongoDB at {settings.mongodb_url}")
except Exception as e:
    logging.error(f"Failed to connect to MongoDB: {e}")