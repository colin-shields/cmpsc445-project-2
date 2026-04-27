from fastapi import FastAPI
from api.routes import counties, predict, climate, health

app = FastAPI(
    title="PA Climate Resilience Intelligence System",
    description="ML system predicting long-term climate resilience across Pennsylvania counties",
    version="1.0"
)

app.include_router(health.router)
app.include_router(counties.router, prefix="/counties")
app.include_router(predict.router, prefix="/predict")
app.include_router(climate.router, prefix="/climate")