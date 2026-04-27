# backend/core/config.py

from pathlib import Path

# -----------------------------
# Base directories
# -----------------------------
BASE_DIR = Path(__file__).resolve().parent.parent

DATA_DIR = BASE_DIR / "data"
RAW_DIR = DATA_DIR / "raw"
PROCESSED_DIR = DATA_DIR / "processed"
INTERIM_DIR = DATA_DIR / "interim"

MODEL_DIR = BASE_DIR / "models"

# -----------------------------
# ML settings
# -----------------------------
DEFAULT_MODEL = "rf"

FEATURE_COLUMNS = [
    "temp",
    "precip",
    "wind",
    "hazard",
    "social",
    "landcover"
]