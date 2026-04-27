"""
Preprocessing pipeline stage for county climate features.
Handles data cleaning, standardization, and feature engineering.
"""

import pandas as pd


def preprocess():
    print("Performing preprocessing steps on dataset...")

    # Load processed county data.
    df = pd.read_csv(r".\data\processed\county_features.csv")
    df.columns = df.columns.str.lower().str.replace(' ', '_')

    # Drop unnecessary columns.
    #-- HEV is redundant (just 100*Risk); keep Risk instead.
    df.drop(columns=['hev'], inplace=True)

    # Split columns into id & features.
    id_columns = ['fips_county_code', 'county_name']
    feature_columns = [col for col in df.columns if col not in id_columns]

    # Z-Score Standardization.
    for column in feature_columns:
        df[column] = (df[column] - df[column].mean()) / df[column].std()

    # Create climate stress score.
    df['climate_stress_score'] = df[['tempchg', 'heatext', 'drychg']].mean(axis=1)
    
    # Save to file.
    df.to_csv(r".\data\processed\preprocessed.csv", index=False)
    print("Saved preprocessed data.")

if __name__ == "__main__":
    preprocess()
