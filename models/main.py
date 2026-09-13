from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

CORSMiddleware( 
    app = app ,
    allow_credentials = ["*"] ,
    allow_origins = ["http://localhost:3000"] ,
    allow_methods = ["*"]
)

@app.get("/")
async def home():
    return {
        "message" : "Hello world "
    }