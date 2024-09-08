# main.py
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

import routes.user as User
import routes.company as Company
import routes.companyuser as CompanyUser
#import routes.listing as Listing

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

#app.include_router(Listing.router, prefix='/listing', tags=['Listing'])
app.include_router(User.router, prefix='/user', tags=['User'])
app.include_router(Company.router, prefix='/company', tags=['Company'])
app.include_router(CompanyUser.router, prefix='/companyuser', tags=['CompanyUser'])
