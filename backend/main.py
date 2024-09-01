# main.py
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
import routes.company as Company
import routes.listing as Listing
import routes.user as User

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:8080'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(Listing.router, prefix='/listing', tags=['Listing'])
app.include_router(User.router, prefix='/user', tags=['User'])
app.include_router(Company.router, prefix='/company', tags='Company')
