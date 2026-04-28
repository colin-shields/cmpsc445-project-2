import joblib
import pandas as pd
from sklearn.metrics import silhouette_score, davies_bouldin_score
from sklearn.cluster import KMeans
from train import get_feature_columns


def evaluate():
    """Evaluates the pre-trained model (built in train.py) via silhouette and Davies-Bouldin scores. Returns the
    scores and the data with cluster information."""
    # Load model & data.
    model: KMeans = joblib.load(r"data\model\kmeans.joblib")
    df = pd.read_csv(r"data\processed\preprocessed.csv")

    # Model prediction.
    feature_columns = get_feature_columns(df)
    X = df[feature_columns]
    labels = model.predict(X)

    # Evaluation.
    scores = {
        'silhouette': silhouette_score(X, labels),
        'davies_bouldin': davies_bouldin_score(X, labels),
    }

    # Clustering.
    df['cluster'] = labels

    return df, scores


if __name__ == '__main__':
    evaluate()
