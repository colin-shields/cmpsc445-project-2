"""
This scripts loads the dataset from the raw data files.
"""

import pandas as pd
import os

def build_dataset():
    print("Building county feature dataset...")

    # Create processed data directory if it does not already exist.
    os.makedirs(r"data\processed", exist_ok=True)

    # Load DataFrames.
    fips_df = pd.read_csv(r"data\raw\fips_lookup.csv")
    df = pd.read_excel(r"data\raw\crv-us-climate-risk-proj-county-2040-2049-xlsx.xlsx", sheet_name='ClimateRisk')

    # Keep only PA counties.
    df = pd.merge(fips_df, df, left_on='FIPS County Code', right_on='GEOID', how='left')

    df.dropna(inplace=True)     # Only the statewide column is missing features
    df.drop(columns="GEOID", inplace=True)  # Duplicate of FIPS County Code col

    # Rename certain columns to use simpler keys.
    df = df.rename(columns={
        "Hazard(H)": "Hazard",
        "Expos(E)": "Expos",
        "Vulner(V)": "Vulner",
        "Risk=HEV": "Risk",
        "HEV*100": "HEV"
    })

    # Save to files.
    df.to_csv(r"data/processed/county_features.csv", index=False)
    # df.to_json(r"data/processed/county_features.json", index=False)
    print("Saved dataset.")

if __name__ == "__main__":
    build_dataset()
