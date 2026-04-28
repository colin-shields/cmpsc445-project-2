import os

import streamlit as st
import pandas as pd
import geopandas as gpd
import numpy as np
import matplotlib.pyplot as plt

from pipeline import execute_pipeline
from evaluate import evaluate

DATA_PATH = r"data/processed/preprocessed.csv"
MODEL_PATH = r"data/model/kmeans.joblib"
MAP_URL = "https://raw.githubusercontent.com/plotly/datasets/master/geojson-counties-fips.json"
COLUMN_DISPLAY_NAMES = {
    'fips_county_code': 'FIPS Code',
    'county_name': 'County',
    'cluster': 'Cluster',
    'cluster_label': 'Cluster Label',
    'climate_stress_score': 'Climate Stress Score',
    'counties': 'Number of Counties',
    'avg_climate_stress': 'Average Climate Stress (mean)'
}


# HELPER FUNCTIONS #####################################################################################################

def ensure_model_and_data():
    """Ensure that the model and data structures exist."""
    if not (os.path.exists(DATA_PATH) and os.path.exists(MODEL_PATH)):
        # Some data does not exist. Run pipeline to create them.
        execute_pipeline()


def assign_cluster_labels(df):
    """Given a clustered DataFrame, assign names to each cluster."""
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


def create_cluster_map(df):
    """Create map of Pennsylvania colorized by the cluster of each county."""
    # Load US counties shapefile from public source.
    url = MAP_URL
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
        cmap="Spectral_r",
        # cmap="Pastel1",
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


def create_stress_map(df):
    """Create map of Pennsylvania colorized by the climate stress of each county."""
    counties = gpd.read_file(MAP_URL)
    counties['id'] = counties['id'].astype(np.int64)

    # Merge with dataset.
    climate_counties = pd.merge(df, counties, left_on='fips_county_code', right_on='id', how='left')

    climate_counties = gpd.GeoDataFrame(climate_counties)

    # st.write(climate_counties)

    # Plot.
    fig, ax = plt.subplots(figsize=(10, 10))

    climate_counties.plot(column='climate_stress_score', cmap='cool', linewidth=0.5, ax=ax, edgecolor='black')

    # Add labels.
    for idx, row in climate_counties.iterrows():
        try:
            centroid = row['geometry'].centroid
            ax.text(centroid.x, centroid.y,
                    f"{row['climate_stress_score']:.2f}",
                    fontsize=6, ha='center')
        except:
            pass

    ax.axis('off')
    fig.patch.set_facecolor('none')
    return fig


# LOAD DATA ############################################################################################################

ensure_model_and_data()

df, scores = evaluate()
df["cluster_label"], cluster_name_map = assign_cluster_labels(df)


# DATA FOR DISPLAY #####################################################################################################

cluster_map = create_cluster_map(df)
stress_map = create_stress_map(df)

cluster_stats = (
    df.groupby(["cluster", "cluster_label"])
    .agg(counties=("county_name", "count"), avg_climate_stress=("climate_stress_score", "mean"))
    .sort_values("avg_climate_stress")
    .rename(columns=COLUMN_DISPLAY_NAMES)
)

best_scores = df.sort_values("climate_stress_score").head(10)[
        ["fips_county_code", "county_name", "climate_stress_score"]
    ].rename(columns=COLUMN_DISPLAY_NAMES)

best_scores_cluster = df.sort_values("climate_stress_score").head(10)[
        ["fips_county_code", "county_name", "cluster_label", "climate_stress_score"]
    ].rename(columns=COLUMN_DISPLAY_NAMES)

cluster_assigmnents = df[["fips_county_code", "county_name", "cluster_label", "climate_stress_score"]].rename(columns=COLUMN_DISPLAY_NAMES)


# STREAMLIT ############################################################################################################

# Config.
st.set_page_config(page_title="PA Climate Analysis", layout="wide")

# Sidebar.
if st.sidebar.button("Retrain Model"):
    with st.spinner("Retraining model and updating clusters..."):
        execute_pipeline()
    st.rerun()

st.sidebar.markdown("### Cluster Label Key:")
cluster_key = [(f"{cluster_id}", f"**{cluster_name}**") for cluster_id, cluster_name in cluster_name_map.items()]
st.sidebar.table(cluster_key)

# Header.
st.title("Which Pennsylvania region handles climate change the best?")
st.write("In this page, we explore which Pennsylvania counties have the least amount of stress put on their "
         "climates. We will visualize each county's Climate Stress Score on a map of Pennsylvania and apply KMeans "
         "clustering to group the counties by score.")

# Basic Climate Stress.
st.write("## Climate Stress: Baseline")
st.write("To establish a baseline climate metric to compare the clusters against, we created a composite Climate "
         "Stress Score. This score is calculated as a mean of the county's temperature change, heat exchange, and "
         "dryness metrics. The figure below shows all PA counties with their climate scores. Lighter blue colors "
         "signify less climate stress, and magenta signifies the most stress.")
st.pyplot(stress_map)

st.write("### Top 10 counties with the lowest climate stress:")
st.dataframe(best_scores, hide_index=True)

# Clustering.
st.write("## Climate Stress: Clustering")
st.write("Now, we'll show the results of KMeans clustering (k = 5) to the dataset to label counties by their scores. "
         "The figure below visualizes each PA county by the cluster into which they were placed. The key in the "
         "upper-right corner of the figure which clusters are represented by each color.")
st.pyplot(cluster_map)
st.dataframe(cluster_stats)
st.write("Looking at the cluster assignments alone, most Pennsylvania counties appear to have very low or okay climate "
         "stress, mostly concentrated in Southern and Northeastern PA. "
         "The most stressed counties appear to be concentrated in the Southeast and along the latitudinal center of "
         "the state. "
         "Interestingly, while Philadelphia county and the counties doubly-adjacent to it are assigned to more "
         "stressed clusters, the three counties immediately adjacent are assigned to the Better cluster. ")

# Cluster Evaluation.
st.write("## Cluster Evaluation")
sil = scores['silhouette']
db = scores['davies_bouldin']

st.table([['Metric', 'Score'],
          ['Silhouette', sil],
          ['Davies-Bouldin', db]])
st.write("Clustering was evaluated on two metrics: the Silhouette score and the Davies-Bouldin (DB) score. "
         "While improvements could be made, both scores fall within acceptable ranges for this task. "
         "Silhouette scores range from -1 to 1, with -1 representing poor clustering and misclassified samples and 1 "
         "representing excellent, well-separated clusters. "
         f"A Silhouette score of {sil:.2f} signifies that, while there are some overlapping clusters or boundary "
         "samples, clustering did perform adequately, and counties can be evaluated based on their cluster to some "
         "degree. DB scores are greater than 0, with scores closer to 0 representing better clustering. "
         f"A DB score of {db:.2f} means approximately the same as the Silhouette score of {sil:.2f}—although not "
         "perfect, it is a generally acceptable result, especially in potentially noisy real-world datasets, such as "
         "the one we are using.")
