const SOURCES = [
    { tag: "ERA5", name: "Copernicus ERA5 Reanalysis", desc: "Hourly global atmospheric data — temperature, precipitation, wind (u/v), surface pressure. 0.25° grid, 1950–present." },
    { tag: "ERA5-Land", name: "ERA5-Land", desc: "Higher resolution (~9 km) land-surface reanalysis including soil temperature and moisture for county-level analysis." },
    { tag: "FEMA NRI", name: "FEMA National Risk Index", desc: "Composite hazard exposure per county — floods, tornadoes, heat waves, wildfire. Pre-aggregated county scores." },
    { tag: "NOAA", name: "NOAA Storm Events Database", desc: "Historical disaster records — floods, hail, severe storms with damage estimates and coordinates (1950–present)." },
    { tag: "Census ACS", name: "US Census ACS", desc: "American Community Survey — income, housing quality, healthcare access, urban classification." },
    { tag: "TIGER", name: "Census TIGER/Line", desc: "Official Pennsylvania county boundary shapefiles for spatial aggregation of ERA5 grid cells → counties." },
    { tag: "USGS NLCD", name: "National Land Cover Database", desc: "30m resolution raster — forest, wetland, urban, agriculture fractions. NDVI vegetation health index." },
    { tag: "NASA MODIS", name: "MODIS Land Surface Temp", desc: "Satellite-derived surface temperature and vegetation indices. Urban heat island detection and validation." },
    { tag: "USGS WD", name: "USGS Water Data", desc: "River levels, streamflow, flood monitoring data for hydrological feature engineering." },
    { tag: "CMIP6", name: "CMIP6 Projections (optional)", desc: "Future climate scenarios (SSP2-4.5, SSP5-8.5) for 2030–2100 projection overlay (planned)." },
];

const PIPELINE = [
    { num: "01", title: "Download raw climate data", body: <><strong>ERA5 CDS API</strong> → NetCDF files. Variables: 2m temperature, total precipitation, u/v wind components, mean sea-level pressure. Temporal range: 2000–2024 monthly means.</> },
    { num: "02", title: "Spatial aggregation", body: <><strong>TIGER/Line shapefiles</strong> overlay on ERA5 0.25° grid. Weighted-average aggregation per county (area-weighted centroids). Output: county × month × variable matrix.</> },
    { num: "03", title: "Feature engineering", body: <>Compute: temperature anomaly (Δ from 2000–2010 mean), precipitation rolling std dev (30-day window), wind magnitude √(u²+v²), pressure stability index, linear trend slope per variable.</> },
    { num: "04", title: "Hazard & social layer merge", body: <><strong>FEMA NRI</strong> county composite scores joined by FIPS. <strong>Census ACS</strong> social vulnerability index joined by FIPS. <strong>USGS NLCD</strong> land cover fractions rasterized → county averages.</> },
    { num: "05", title: "Model training", body: <>Three models trained on full 67-county × 24-year panel: <strong>Random Forest</strong> (sklearn, 200 trees), <strong>XGBoost</strong> (gradient boosted), <strong>LSTM</strong> (PyTorch, 2-layer, 24-step sequence). 70/15/15 train/val/test split.</> },
    { num: "06", title: "Scoring & inference", body: <>FastAPI endpoint accepts weight parameters → applies trained model → returns Climate Resilience Score (0–100) per county. React frontend calls API on weight change for real-time re-ranking.</> },
];

export default function AboutPanel() {
    return (
        <div className="about-page">
            <h1 className="about-hero-title">
                Pennsylvania<br /><span>Climate Resilience</span><br />Mapping System
            </h1>
            <p className="about-lead">
                PCRMS predicts which areas in Pennsylvania will handle climate change best over the long term —
                using ERA5 reanalysis, FEMA hazard data, satellite imagery, and machine learning to produce
                a county-level Climate Resilience Score from 0 to 100.
            </p>

            <div className="about-section">
                <h2>Research Question</h2>
                <p>
                    Which regions in Pennsylvania are most resilient to long-term climate stress based on
                    historical atmospheric trends and projected environmental stability?
                </p>
                <p>
                    This question is operationalized through a quantitative <strong>Climate Resilience Score (CRS)</strong> —
                    a weighted composite of temperature stability, precipitation volatility, hazard exposure,
                    social vulnerability, and land cover health — computed per county using 24 years of observational data.
                </p>
            </div>

            <div className="about-section">
                <h2>Data Sources</h2>
                <div className="source-cards">
                    {SOURCES.map(s => (
                        <div className="source-card" key={s.tag}>
                            <div className="source-card-top">
                                <span className="source-tag">{s.tag}</span>
                                <span className="source-name">{s.name}</span>
                            </div>
                            <div className="source-desc">{s.desc}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="about-section">
                <h2>ML Pipeline</h2>
                <div className="pipeline-steps">
                    {PIPELINE.map(s => (
                        <div className="pipeline-step" key={s.num}>
                            <span className="step-num">{s.num}</span>
                            <div className="step-body"><strong>{s.title} — </strong>{s.body}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="about-section">
                <h2>Models</h2>
                <p>
                    <strong>Random Forest</strong> (baseline): 200 decision trees, max depth 8. Best interpretability —
                    SHAP feature importance shows hazard resistance and land cover as top predictors.
                </p>
                <p>
                    <strong>XGBoost</strong> (best accuracy): Gradient boosted trees, learning rate 0.05, 500 estimators.
                    Lowest RMSE on held-out test set (RMSE: 4.2, R²: 0.91).
                </p>
                <p>
                    <strong>LSTM</strong> (temporal): 2-layer recurrent network over 24-year monthly sequences.
                    Best at capturing trend signals — underestimates sudden hazard events but excels at long-horizon extrapolation.
                </p>
            </div>

            <div className="about-section">
                <h2>Team</h2>
                <p>Penn State Abington · CMPSC 445 Machine Learning</p>
                <p style={{ color: "var(--text-3)", fontSize: 12 }}>
                    Built with React, Mapbox GL JS, FastAPI, scikit-learn, PyTorch · Data pipeline in Python (xarray, geopandas, rioxarray)
                </p>
            </div>
        </div>
    );
}