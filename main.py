import os

import streamlit as st
import pandas as pd
import geopandas as gpd
import numpy as np
import matplotlib.pyplot as plt

from pipeline import execute_pipeline
from train import get_feature_columns, load_model

DATA_PATH = r"data\processed\preprocessed.csv"
MODEL_PATH = r"data\model\kmeans.joblib"


def ensure_model_and_data():
    if not os.path.exists(DATA_PATH) or not os.path.exists(MODEL_PATH):
        execute_pipeline()


def load_data():
    return pd.read_csv(DATA_PATH)


def assign_cluster_labels(df):
    cluster_means = df.groupby("cluster")["climate_stress_score"].mean().sort_values()
    ordered_clusters = cluster_means.index.tolist()
    names = ["Best", "Better", "Okay", "Worse", "Worst"]
    cluster_name_map = {
        cluster: names[idx] if idx < len(names) else f"Cluster {idx}"
        for idx, cluster in enumerate(ordered_clusters)
    }
    return df["cluster"].map(cluster_name_map), cluster_name_map


ensure_model_and_data()

df = load_data()
model = load_model(MODEL_PATH)
feature_columns = get_feature_columns(df)
df["cluster"] = model.predict(df[feature_columns])
df["cluster_label"], cluster_name_map = assign_cluster_labels(df)

# Configure UI.
st.set_page_config(page_title="PA Climate Analysis", layout="wide")
st.title("Which Pennsylvania region handles climate change the best?")

# Sidebar controls.
if st.sidebar.button("Retrain Model"):
    with st.spinner("Retraining model and updating clusters..."):
        execute_pipeline()
    st.experimental_rerun()

st.sidebar.markdown("### Cluster label meaning")
for cluster_id, cluster_name in cluster_name_map.items():
    st.sidebar.write(f"**{cluster_name}** = cluster {cluster_id}")

# Load US counties shapefile from public source.
url = "https://raw.githubusercontent.com/plotly/datasets/master/geojson-counties-fips.json"
counties = gpd.read_file(url)
counties["id"] = counties["id"].astype(np.int64)

# Merge with dataset.
climate_counties = pd.merge(df, counties, left_on="fips_county_code", right_on="id", how="left")
climate_counties = gpd.GeoDataFrame(climate_counties)

# Plot.
fig, ax = plt.subplots(figsize=(10, 10))
climate_counties.plot(
    column="cluster_label",
    categorical=True,
    cmap="Set2",
    linewidth=0.5,
    ax=ax,
    edgecolor="black",
    legend=True,
)
ax.axis("off")
fig.patch.set_facecolor("none")

st.write("## PA County Climate Clusters")
st.write("Counties are grouped using KMeans clustering on climate risk and other standardized features.")
st.pyplot(fig)

st.write("### Cluster statistics")
cluster_stats = (
    df.groupby(["cluster", "cluster_label"])
    .agg(counties=("county_name", "count"), avg_climate_stress=("climate_stress_score", "mean"))
    .sort_values("avg_climate_stress")
)
st.dataframe(cluster_stats)

st.write("### Best counties by climate stress score")
st.dataframe(
    df.sort_values("climate_stress_score").head(10)[
        ["fips_county_code", "county_name", "cluster_label", "climate_stress_score"]
    ]
)

st.write("### County cluster assignments")
st.dataframe(df[["fips_county_code", "county_name", "cluster_label", "climate_stress_score"]])
