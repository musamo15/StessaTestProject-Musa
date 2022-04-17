from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import router

app = FastAPI()

origins = ["*"]

"""
Allows fastapi to take use of CORS to handle requests from other ports
"""
app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers=["*"]
)

app.include_router(router.rout)

@app.get("/")
async def root():
    return {"Stessa Test Project" : "Welcome to our page!!"}
