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


# HELPER FUNCTIONS #####################################################################################################

def ensure_model_and_data():
    if not (os.path.exists(DATA_PATH) and os.path.exists(MODEL_PATH)):
        # Some data does not exist. Run pipeline to create them.
        execute_pipeline()


def assign_cluster_labels(df):
    # Group by Cluster.
    cluster_means = df.groupby("cluster")["climate_stress_score"].mean().sort_values()
    ordered_clusters = cluster_means.index.tolist()
    names = ["Best", "Better", "Okay", "Worse", "Worst"]

    cluster_name_map = dict()
    for idx, cluster in enumerate(ordered_clusters):
        if idx < len(names):
            cluster_name_map[cluster] = names[idx]
        else:
            # There are more clusters than defined labels.
            cluster_name_map[cluster] = f"Cluster {idx}"

    return df["cluster"].map(cluster_name_map), cluster_name_map


# LOAD DATA ############################################################################################################

ensure_model_and_data()

df = pd.read_csv(DATA_PATH)
model = load_model(MODEL_PATH)

feature_columns = get_feature_columns(df)
df["cluster"] = model.predict(df[feature_columns])
df["cluster_label"], cluster_name_map = assign_cluster_labels(df)

# STREAMLIT CONFIGURATION ##############################################################################################

# Titles.
st.set_page_config(page_title="PA Climate Analysis", layout="wide")
st.title("Which Pennsylvania region handles climate change the best?")

# Sidebar.
if st.sidebar.button("Retrain Model"):
    with st.spinner("Retraining model and updating clusters..."):
        execute_pipeline()
    st.rerun()

st.sidebar.markdown("### Cluster Label Key")
for cluster_id, cluster_name in cluster_name_map.items():
    st.sidebar.write(f"**{cluster_name}** = cluster {cluster_id}")


# COUNTY CLUSTER MAP ###################################################################################################

def create_map():
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
    fig.patch.set_facecolor("none")     # set transparent background.

    # Add labels.
    for idx, row in climate_counties.iterrows():
        try:
            centroid = row['geometry'].centroid
            # ax.text(centroid.x, centroid.y, f"{row['county_name']}\n{row['climate_stress_score']:.2f}", fontsize=5, ha='center')
            ax.text(centroid.x, centroid.y, f"{row['county_name']}", fontsize=6, ha='center')
        except:
            pass

    return fig


st.write("## PA County Climate Clusters")
st.write("Counties are grouped using KMeans clustering on climate risk and other standardized features.")
st.pyplot(create_map())


# CLUSTER STATISTICS ###################################################################################################

st.write("### Cluster Statistics")
cluster_stats = (
    df.groupby(["cluster", "cluster_label"])
    .agg(counties=("county_name", "count"), avg_climate_stress=("climate_stress_score", "mean"))
    .sort_values("avg_climate_stress")
)
st.dataframe(cluster_stats)

st.write("### Best Counties by Climate Stress Score")
st.dataframe(
    df.sort_values("climate_stress_score").head(10)[
        ["fips_county_code", "county_name", "cluster_label", "climate_stress_score"]
    ],
    hide_index=True
)

st.write("### County Cluster Assignments")
st.dataframe(df[["fips_county_code", "county_name", "cluster_label", "climate_stress_score"]], hide_index=True)
