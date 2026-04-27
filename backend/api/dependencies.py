from functools import lru_cache
import pandas as pd
import joblib

from backend.core.config import PROCESSED_DIR, MODEL_DIR, FEATURE_COLUMNS


@lru_cache(maxsize=1)
def get_dataset():
    path = PROCESSED_DIR / "county_features.csv"
    return pd.read_csv(path)


@lru_cache(maxsize=1)
def get_model(model_name="rf"):
    model_path = MODEL_DIR / f"{model_name}_model.pkl"
    return joblib.load(model_path)


def get_features():
    return FEATURE_COLUMNS