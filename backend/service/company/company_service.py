from db.config import db, settings
from db.user_models import *
from util.password_converter import *

company_collection = db[settings.company_collection]

async def invalidName (name: str):
    duplicate_name = await company_collection.find_one({'name': name})

    if (duplicate_name is not None):
        return True
    
    return False