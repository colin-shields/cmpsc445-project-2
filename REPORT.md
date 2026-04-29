# Overview/Description

ClimateSafe PA is a web-based dashboard application developed as part of CMPSC 445 Project-2, which had the required theme of "Best in PA". The application ranks Pennslyvania counties by their long-term climate safety using NASA's U.S. Climate Risk Projections dataset over the period 2040–2049. It first processes climate risk data to create a composite Climate Stress Score, based on a county's temperature change, heat extremes, and dryness metrics. Counties are sorted by this score and clustered with a KMeans algorithm, identifying which regions handle climate change the best and the worst. The application visualizes the results of these methods through interactive maps and data tables using Streamlit, providing useres with insights into climate resilience across Pennsylvania counties.


# Significance

The project addresses the critical issue of climate change and its impacts on local communities, providing data-driven insights into which Pennsylvania counties are best equipped to handle future climate risks. Through analyzing NASA's climate projections, the application helps to identify vulnerable areas and resilient regions, allowing for informed potential decision-making in urban planning, emergency preparedness, and resource allocation. The "Best in PA" theme is interpreted through a lens of climate safety, demonstrating how machine learning can simplify complex environmental data into visual, actionable information for policy makers, businesses, and residents. The projec showcases the practical application of unsupervised learning techniques to real-world environmental challenges, bridging the gap between the theory of machine learning concepts and societal action.


# Data Collection

The primary dataset used in this application is NASA's U.S. Climate Risk Projections by County, 2040–2049, obtained from the NASA Socioeconomic Data and Applications Center (SEDAC) and accessible [here](https://doi.org/10.7927/ABR8-V666). This dataset provides many county-level climate assessment metrics:

| Variable                  | Column Name | Description 
| ------------------------- | ----------- | ----------- 
| Temperature Change        | TempChg     | Mean temperature in the 2040s compared to baseline temperature
| Precipitation Change      | PrepChg     | Mean precipitation in the 2040s compared to baseline precipitation
| Extreme Precipitation     | PrepExt     | Days exceeding 98th percentile of daily baseline precipitation
| Extreme Cold              | ColdExt     | Days below 2 percentiles of the minimum baseline temperature
| Extreme Heat / Heat Waves | HeatExt     | Days exceeding the 97.5 percentile of daily maximum baseline temperature for 3 consecutive days
| Dryness                   | DryChg      | Standard precipitation index: standardized z score of monthly precipitation in the 2040s compared to baseline
| Impervious Surfaces       | ImpSurface  | Estimated percent impervious surface
| Housing Density           | HouseDen    | Estimate based on population values used to drive housing density growth as depicted by the Spatially Explicit Regional Growth Model (SERGoM v3) 
| Population Estimate       | PopEst      | A demographic model generating county-level population estimates that are distributed by a Spatially Explicit Regional Growth Model (SERGoM v3) 
| Low-Lying Houses          | HouseSLR    | Houses that would be exposed to 0.6 meters of sea level rise or storm surge above the current level
| Low-Lying Roads           | RoadSLR     | Roads that would be exposed to 0.6 meters of sea level rise or storm surge above the current level
| Hazard                    | Hazard(H)   | Composite index of hazard variables
| Exposure                  | Expos(E)    | Composite index of exposure variables
| Vulnerability             | Vulner(V)   | Composite index of vulnerability variables
| Risk                      | Risk=HEV    | Combination of hazard, exposure, and vulnerability indices
| HEV                       | Risk*100    | Standardized combination of hazard, exposure, and vulnerability indices

The data was filtered to include only Pennsylvania counties using FIPS county codes from a lookup table. The data used contains the 67 Pennsylvania counties with their climate risk projections for the 2040–2049 timeframe.

**Sample Data (after preprocessing and feature engineering):**

| county_name | tempchg   | heatext   | drychg    | climate_stress_score |
| ----------- | --------- | --------- | --------- | -------------------- |
| Adams       | -1.744188 | -0.529938 | 1.055577  | -0.406183            |
| Allegheny   | 0.837654  | 0.027872  | -0.519021 | 0.115502             |
| Armstrong   | 0.591746  | 0.828210  | -0.534193 | 0.295254             |
| Beaver      | -0.120228 | -0.384422 | 2.194363  | 0.563237             |
| Bedford     | 1.119883  | 1.483031  | -1.254666 | 0.449416             |

# Preprocessing & Feature Engineering

Data preprocessing involved standardizing column names, removing redundant features (e.g., the HEV column, as it is 100*Risk), and applying Z-score standardization to all numeric features for clustering compatability. Z-score standardization ensures features are on all on the same scale for the distance-based clustering of KMeans. A key step in the feature engineering stage was the creation of a composite Climate Stress Score metric by taking the mean average of Temperature Change, Heat Extremes, and Dryness. This score serves as the primary metric for ranking counties and the target variable for clustering analysis.


# Development

The application comprises a machine learning pipeline, model evaluation, and a Streamlit web interface. 

The machine learning pipeline consists of three main stages: 
1. Data Building – loading the raw data into a preprocessing-ready format
2. Preprocessing – data cleaning, standardization, and feature engineering
3. Model Training – KMeans Clustering (k=5) to group counties by climate stress levels
    - Input: features from preprocessed.csv (tempchg, heatext, drychg, hazard, expos, vulner, risk, etc.)
    - Output: cluster labels (0-4) for each county, representing groupings of climate resilience from Best to Worst

Model evaluation used Silhouette and Davies-Bouldin scores to assess clustering quality. The evaluation resulted in a Silhouette score of ~0.21, indicating moderate clustering with some overlap, and a Davies-Bouldin score of ~1.07, acceptable for real-world data but with room for improvement. The scores suggest that clustering performs adequately but could be enhanced with additional features or different algorithms.

The web application features interactive maps, created with GeoPandas and Matplotlib, which display cluster assignments and counties' individual climate stress scores, and it includes functionality to retrain the model from the sidebar. The application is hosted on the Streamlit Cloud.


# Showcase

The application is hosted on the Streamlit Cloud and can be accessed at https://cmpsc445-project-2.streamlit.app/

<mark>To-Do: add video</mark>
A demonstration video can be watched [here](https://example.com/)

The trained KMeans model is used within the application to dynamically cluster and categorize Pennsylvania counties based on their climate stress scores. Users can view county rankings sorted by their Climate Stress Score and see cluster assignments on interactive maps, where the model groups counties into Best to Worst categories. The sidebar allows users to retrain the model, allowing the clustering to adapt to updated data.


# Discussion & Conclusions

The project successfully applies unsupervised machine learning to environmental data, creating a meaningful ranking of Pennsylvania counties based on climate resilience. The Climate Stress Score provides a simple-yet-effective metric for comparing counties, while KMeans clustering reveals geographic patterns in climate vulnerability. The clustering evaluation metrics (Silhouette: 0.21, Davies-Bouldin: 1.07) suggest acceptable but improvable clustering quility, likely due to the complexity of the real-world climate data.

A few issues were encountered within the development of this project. The clustering evaluation metrics suggest that there is some overlap between clusters, indicating potential for improved feature selection and training methods. The mediocre clustering performance could also likely be attributed to the inherent noise in real-world data. Additionally the use of a composite Climate Stress score simplifies complex climate interactions significantly, which may mean that the application does not capture all nuances. Critically, limiting the analyzed area to a single state reduces generalizability: Such a small geographic area will lead to overfitting, especially if analyzing larger areas reveals that more global climate stresses vary considerably more than in Pennsylvania alone.

The application demonstrates how machine learning can make environmental data accessible and actionable. Future improvements could include additional climate variables, temporal analysis, or predictive modeling. The project fulfills the "Best in PA" theme in identifying climate-resilient regions of the state, contributing to discussions about environmental equity and adaptation planning. This work applies course learning in unsupervised learning, data preprocessing, and model evaluation to a real-world environmental challenge.


# AI Usage

GitHub Copilot was used at select stages of the development process to assist with code generation and debugging. Copilot assisted with <10% of the codebase, primarily in debugging and optimization, while core logic and architecture were developed manually. Specific applications include:
- Correcting syntax errors in creating GeoPandas maps
- Reformating Pandas operations to be more time- and memory-efficient
- Discovering path resolution errors in webhost deployment
