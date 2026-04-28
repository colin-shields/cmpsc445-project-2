import joblib
import pandas as pd
from sklearn.metrics import silhouette_score, davies_bouldin_score, adjusted_rand_score, adjusted_mutual_info_score
from sklearn.cluster import KMeans
from train import get_feature_columns


def evaluate():
    model: KMeans = joblib.load(r"data\model\kmeans.joblib")
    df = pd.read_csv(r"data\processed\preprocessed.csv")

    feature_columns = get_feature_columns(df)
    labels = model.predict(df[feature_columns])

    X = df[feature_columns]

    scores = {
        'silhouette': silhouette_score(X, labels),
        'davies_bouldin': davies_bouldin_score(X, labels),
    }

    df['cluster'] = labels

    return df, scores


if __name__ == '__main__':
    evaluate()
