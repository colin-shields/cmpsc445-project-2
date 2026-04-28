# ClimateSafe PA

ClimateSafe PA is a county-level dashboard developed for CMPSC 445 Project-2, with the teme "Best in PA". It ranks Pennsylvania counties by long-term climate safety using NASA's U.S. Climate Risk Prjections by County, 2040-2049 dataset.

The application processes the data, creating a composite Climate Stress Score based on the county's temperature change, heat exchange, and dryness. The counties are sorted by this composite metric to determine how well they handle climate change. A KMeans clustering algorithm is also applied to determine which regions handle climate change the best and worst.

All data is displayed visually using Streamlit.


## Usage

In the future, the application will be hosted on Streamlit, which will be accessible via a link placed here.

### Running Locally

Clone the repository, then
```powershell
python -m venv venv
venv\Scripts\activate
pip install -r requirments.txt
streamlit run main.py
```

The application will open in a new browser window.

<br>
<hr>

## References

- KC, B., Shepherd, J. M., King, A. W., & Gaither, C. J. (2023). *U.S. Climate Risk Projections by County, 2040-2049* (Version 1.00) [Data set]. Palisades, NY: NASA Socioeconomic Data and Applications Center (SEDAC). https://doi.org/10.7927/ABR8-V666 Date Accessed: 2026-04-28
