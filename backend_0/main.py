# backend/main.py

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from roadmap_logic.roadmap_generator import generate_roadmap  # 🔥 Correct Import

app = FastAPI()

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (later make this secure)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model for user answers
class UserAnswers(BaseModel):
    q0: str
    q1: str
    q2: str
    q3: str
    q4: str
    q5: str
    q6: str
    q7: str
    q8: str
    q9: str

# Main API endpoint
@app.post("/generate-roadmap")
async def create_roadmap(answers: UserAnswers):
    try:
        answers_dict = answers.dict()
        roadmap_json = generate_roadmap(answers_dict)
        return roadmap_json  # Already returns proper dict
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
