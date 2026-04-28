import streamlit as st
import pandas as pd
import geopandas as gpd
import numpy as np
import matplotlib.pyplot as plt

def load_map():
    @st.cache_data
    def load_data():
        # Load a US counties shapefile from a public source
        url = "https://raw.githubusercontent.com/plotly/datasets/master/geojson-counties-fips.json"
        counties = gpd.read_file(url)

        # Filter for Pennsylvania (state FIPS = '42')
        counties['STATE'] = counties['id'].str[:2]
        pa_counties = counties[counties['STATE'] == '42'].copy()

        # Assign random values
        pa_counties['random_value'] = np.random.randint(1, 101, size=len(pa_counties))

        return pa_counties

    pa_counties = load_data()

    # Plot
    fig, ax = plt.subplots(figsize=(10, 10))

    pa_counties.plot(column='random_value', cmap='viridis', linewidth=0.5, ax=ax, edgecolor='black')

    # Add labels (approximate centroid)
    for idx, row in pa_counties.iterrows():
        try:
            centroid = row['geometry'].centroid
            ax.text(centroid.x, centroid.y, str(row['random_value']),
                    fontsize=6, ha='center')
        except:
            pass

    ax.set_title("Random Values by County (Pennsylvania)")
    ax.axis('off')

    return fig

# st.pyplot(fig)

# st.caption("Each county is assigned a random number between 1 and 100.")
