"""
This script builds the final ML-ready dataset:
ERA5 + FEMA + Census → county feature table
"""

import pandas as pd

def build_dataset():
    print("Building county feature dataset...")

    # placeholder structure
    df = pd.DataFrame({
        "county": ["Philadelphia", "Chester"],
        "flood_risk": [0.8, 0.3],
        "heat_risk": [0.7, 0.4],
        "poverty_index": [0.6, 0.2],
    })

    df.to_parquet("data/processed/county_features.parquet")
    print("Saved dataset.")

if __name__ == "__main__":
    build_dataset()