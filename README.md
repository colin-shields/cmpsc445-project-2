# ClimateSafe PA

Read the full report in [REPORT.md](REPORT.md)


## Overview

ClimateSafe PA is a web-based dashboard application developed as part of CMPSC 445 Project-2, which had the required theme of "Best in PA". The application ranks Pennslyvania counties by their long-term climate safety using NASA's U.S. Climate Risk Projections dataset over the period 2040–2049. It first processes climate risk data to create a composite Climate Stress Score, based on a county's temperature change, heat extremes, and dryness metrics. Counties are sorted by this score and clustered with a KMeans algorithm, identifying which regions handle climate change the best and the worst. The application visualizes the results of these methods through interactive maps and data tables using Streamlit, providing useres with insights into climate resilience across Pennsylvania counties.


## Usage

**The application is hosted on Streamlit and can be accessed at https://cmpsc445-project-2.streamlit.app/**

### Running Locally

Clone the repository, then
```powershell
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
streamlit run main.py
```

The application will open in a new browser window.

<br>
<hr>

## References

- KC, B., Shepherd, J. M., King, A. W., & Gaither, C. J. (2023). *U.S. Climate Risk Projections by County, 2040-2049* (Version 1.00) [Data set]. Palisades, NY: NASA Socioeconomic Data and Applications Center (SEDAC). https://doi.org/10.7927/ABR8-V666 Date Accessed: 2026-04-28
