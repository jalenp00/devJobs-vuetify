from bson import Binary
from uuid import uuid4, UUID


def uuid_to_binary(uuid):
    return Binary(uuid.bytes, subtype=4)

def binary_to_uuid(binary):
    return UUID(bytes=binary)