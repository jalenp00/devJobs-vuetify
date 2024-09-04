from bson import Binary
from uuid import uuid4, UUID
import base64


def uuid_to_base64(uuid_obj: UUID) -> str:
    return base64.b64encode(uuid_obj.bytes).decode('utf-8')

def base64_to_uuid(base64_str: str) -> UUID:
    uuid_bytes = base64.b64decode(base64_str)
    return UUID(bytes=uuid_bytes)

def uuid_to_string(uuid_obj: UUID) -> str:
    return str(uuid_obj)

def string_to_binary(id: str) -> Binary:
    
    uuid_obj = UUID(id)
    return Binary(uuid_obj.bytes)