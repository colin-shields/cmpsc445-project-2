from fastapi import APIRouter
import numpy as np

router = APIRouter()

@router.post("/")
def predict(county_features: dict):
    """
    Input: engineered features for a county
    Output: resilience score (0-1)
    """

    # placeholder ML logic (replace with real model later)
    score = (
            county_features.get("flood_risk", 0) * 0.4 +
            county_features.get("heat_risk", 0) * 0.4 +
            county_features.get("poverty_index", 0) * 0.2
    )

    return {
        "resilience_score": float(1 - score),
        "confidence": 0.87
    }