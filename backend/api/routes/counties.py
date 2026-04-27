from fastapi import APIRouter

router = APIRouter()

# fake placeholder for now (we replace with ML output later)
COUNTIES = [
    {"name": "Philadelphia", "resilience_score": 0.42},
    {"name": "Chester", "resilience_score": 0.78},
    {"name": "Allegheny", "resilience_score": 0.63},
]

@router.get("/")
def get_counties():
    return COUNTIES