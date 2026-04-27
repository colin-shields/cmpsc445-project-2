# ClimateSafe PA

ClimateSafe PA is a county-level dashboard for the CMPSC 445 "Best in PA" project theme. It ranks Pennsylvania counties by long-term climate safety using NASA's **U.S. Climate Risk Projections by County, 2040-2049** dataset and lets the user re-score counties by changing which types of climate stress matter most.

## What the app does

- maps all 67 Pennsylvania counties on an interactive Mapbox dashboard
- ranks counties by an adjustable climate safety scenario score
- shows county-level heat, flood, drought, exposure, and social safety dimensions
- groups counties into three unsupervised-learning clusters for interpretation
- supports both light and dark mode

## Data used now

- NASA SEDAC / Earthdata: U.S. Climate Risk Projections by County, 2040-2049
  - workbook used in this repo: `backend/data/raw/crv-us-climate-risk-proj-county-2040-2049.xlsx`
  - official dataset page: https://www.earthdata.nasa.gov/data/catalog/esdis-ciesin-sedac-crv-uscrpc-2040-2049-1.00

## Recommended next datasets

These are the best official follow-up sources if you want to strengthen the final report and enrich the app:

- FEMA National Risk Index: https://hazards.fema.gov/nri/data-resources
- CDC Social Vulnerability Index: https://svi.cdc.gov/dataDownloads/data-download.html
- U.S. Census ACS API: https://www.census.gov/programs-surveys/acs/data/data-via-api.html
- NOAA Climate Normals: https://www.ncei.noaa.gov/products/land-based-station/us-climate-normals

## Machine learning framing

The current version uses NASA county projections as the main feature space, then applies:

- feature normalization into safety dimensions
- unsupervised clustering to group counties into three interpretable climate profiles
- scenario-weighted ranking for web inference

That gives you a defensible ML story for the course while staying realistic with the data you already have.

## Repo layout

- `frontend/` React + Vite dashboard
- `backend/` lightweight Node API and data pipeline
- `backend/data/processed/pa_county_climate_risk.json` cleaned county dataset used by the app
- `backend/pipelines/build_nasa_pa_dataset.py` rebuild script for the processed dataset

## Run locally

Start the API:

```powershell
cd backend
node server.js
```

Start the frontend:

```powershell
cd frontend
npm run dev
```

The Vite dev server proxies `/api` requests to `http://localhost:8787`.

## Rebuild the processed county dataset

This uses the bundled Python runtime plus `pandas` and `openpyxl`.

## Notes for the final report

- Objective: identify which Pennsylvania counties appear safest under long-term climate stress.
- Significance: translates climate projections into a decision-support tool for comparing places in PA.
- Data collection: NASA workbook now, with FEMA/CDC/Census/NOAA listed for enrichment.
- Model development: scenario scoring + clustering over projected county climate features.
- Showcase: the web dashboard acts as the inference interface.
