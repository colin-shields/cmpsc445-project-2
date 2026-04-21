
#=========== IMPORT LIBARIES ========
from fastapi import FastAPI
import joblib
import pandas as pd
#=====================================

# API to Predict PA Zones
app = FastAPI()
model = joblib.load("model/model.pkl")

@app.get("/predict")
def predict(
        county: str,
        year: int,
        scenario: str
):
    input_data = pd.DataFram([{
        "temp_change": 0.03 * (year - 2025),
        "flood_risk": 0.4,
        "elevation": 0.6,
        "population_density": 0.5,
        "income": 0.7,
        "elderly_ratio": 0.3,
        "scenario_factor": {"low": 0.2, "moderate": 0.5, "high": 0.9}[scenario]
    }])

    prediction = model.predict(input_data)[0]
    return {
        "county": county,
        "year": year,
        "scenario": scenario,
        "resilience_score": float(prediction)
    }