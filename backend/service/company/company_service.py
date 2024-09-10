from db.config import db, settings
from db.user_models import *
from util.password_converter import *
from uuid import UUID
from validation.ErrorModel import ErrorModel
from logger_config import logger

company_collection = db[settings.company_collection]

async def invalidName (name: str):
    duplicate_name = await company_collection.find_one({'name': name})

    if (duplicate_name is not None):
        return True
    
    return False



async def get_company_name_from_company_id(id: str) -> str:
    uuid_id = UUID(id)
    logger.info(f'uuid_id is: {uuid_id}')
    try:
        # Await the asynchronous find_one method
        result = await company_collection.find_one({'_id': uuid_id}, {'name': 1, '_id': 0})

        if result is None:
            return ErrorModel(error=f'No company found with that id')  # Handle the case where the company is not found

        # Extract the name from the result dictionary
        company_name = result.get('name')

        return str(company_name)

    except Exception as e:
        return ErrorModel(error=f"An error occurred while fetching company name: {e}")
