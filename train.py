"""
Training pipeline stage for county climate features.
Handles unsupervised clustering and model persistence.
"""

import os
import pandas as pd
import joblib

from sklearn.cluster import KMeans

MODEL_DIR = r"data\model"
MODEL_PATH = os.path.join(MODEL_DIR, "kmeans.joblib")


def get_feature_columns(df):
    return [col for col in df.columns if col not in ["fips_county_code", "county_name", "cluster"]]


def train(n_clusters=5):
    print("Training Model...")
    os.makedirs(MODEL_DIR, exist_ok=True)

    df = pd.read_csv(r".\data\processed\preprocessed.csv")
    feature_columns = get_feature_columns(df)
    df_features = df[feature_columns].copy()

    cluster = KMeans(n_clusters=n_clusters, random_state=42, n_init=10)
    df["cluster"] = cluster.fit_predict(df_features)

    df.to_csv(r".\data\processed\clustered.csv", index=False)

    cluster_summary = df.groupby("cluster")[feature_columns + ["climate_stress_score"]].mean()
    cluster_summary.to_csv(r".\data\processed\cluster_summary.csv")

    joblib.dump(cluster, MODEL_PATH)
    print(f"Saved model to {MODEL_PATH}")


if __name__ == "__main__":
    train()
