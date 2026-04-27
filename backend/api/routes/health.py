from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def health():
    return {
        "status": "ok",
        "message": "PCRIS backend running",
        "model_loaded": True
    }