from fastapi import FastAPI, status
from pydantic import BaseModel

app = FastAPI()

class Lead(BaseModel):
    google_place_id: str
    business_name: str
    city: str
    relevance_score: float
    is_high_quality: bool

@app.post("/webhook/ingest", status_code=status.HTTP_201_CREATED)
async def ingest_lead(lead: Lead):
    return {"status": "success"}
