from fastapi import APIRouter

router = APIRouter()

@router.get("/era5-summary")
def era5_summary():
    return {
        "message": "ERA5 pipeline not yet connected",
        "status": "stub"
    }