""""""
import pandas as pd
import numpy as np
import joblib

from sklearn.cluster import KMeans


def train():
    print("Training Model...")

    # Load preprocessed data.
    df = pd.read_csv(r".\data\processed\preprocessed.csv")

    # Split columns into id & features.
    id_columns = ['fips_county_code', 'county_name']
    feature_columns = [col for col in df.columns if col not in id_columns]
    df_features = df[feature_columns]

    # KMeans clustering with k=3.
    cluster = KMeans(n_clusters=3)
    df['cluster'] = cluster.fit_predict(df_features)
    df_features['cluster'] = df['cluster']
    df.to_csv(r".\data\processed\clustered.csv")

    # Create cluster summary.
    cluster_summary = df_features.groupby('cluster').mean()
    cluster_summary.to_csv(r".\data\processed\cluster_summary.csv")

    # Save model.
    joblib.dump(cluster_summary, r".\data\model\model.joblib")

if __name__ == "__main__":
    train()
