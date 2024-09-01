import datetime

# datetime.now() -> DD/MM
def get_time_dm():
    now = datetime.datetime.now()
    return now.strftime("%d/%m")

# datetime.now() -> MM/YY
def get_time_my():
    now = datetime.datetime.now()
    return now.strftime("%m/%y")

# datetime.now() -> DD/MM/YYYY
def get_time_dmy():
    now = datetime.datetime.now()
    return now.strftime("%d/%m/%Y")

