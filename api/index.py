# api/index.py (FastAPI handler for Vercel)

from fastapi import FastAPI
from fastapi.responses import JSONResponse
from agent import generate_feed

app = FastAPI()

@app.get("/api/feed")
def get_feed():
    return JSONResponse(content={"feed": generate_feed()})

