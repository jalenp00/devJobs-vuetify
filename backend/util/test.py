import uuid

def string_to_hex_uuid(uuid_string: str) -> str:
    uuid_obj = uuid.UUID(uuid_string)
    return uuid_obj.hex

# Example usage
uuid_string = '3fa85f64-5717-4562-b3fc-2c963f66afa6'
hex_uuid = string_to_hex_uuid(uuid_string)

print(f"Hexadecimal UUID: {hex_uuid}")
