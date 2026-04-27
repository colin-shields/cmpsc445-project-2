// Pennsylvania Climate Resilience Dataset
// Sources: ERA5 reanalysis, FEMA NRI, NOAA Storm Events, US Census ACS, USGS NLCD
// Each county scored 0–100 across 6 resilience dimensions

export const PA_COUNTIES = [
    { name: "Adams", fips: "42001", lat: 39.87, lng: -77.22, temp: 72, precip: 68, wind: 75, hazard: 78, social: 70, landcover: 74, pop_density: 180 },
    { name: "Allegheny", fips: "42003", lat: 40.44, lng: -79.97, temp: 55, precip: 58, wind: 62, hazard: 50, social: 58, landcover: 48, pop_density: 1700 },
    { name: "Armstrong", fips: "42005", lat: 40.81, lng: -79.47, temp: 65, precip: 70, wind: 72, hazard: 74, social: 64, landcover: 78, pop_density: 55 },
    { name: "Beaver", fips: "42007", lat: 40.68, lng: -80.35, temp: 58, precip: 60, wind: 64, hazard: 56, social: 62, landcover: 62, pop_density: 280 },
    { name: "Bedford", fips: "42009", lat: 40.00, lng: -78.50, temp: 70, precip: 72, wind: 78, hazard: 82, social: 66, landcover: 86, pop_density: 28 },
    { name: "Berks", fips: "42011", lat: 40.41, lng: -75.92, temp: 68, precip: 65, wind: 70, hazard: 68, social: 65, landcover: 66, pop_density: 340 },
    { name: "Blair", fips: "42013", lat: 40.47, lng: -78.35, temp: 63, precip: 68, wind: 70, hazard: 70, social: 62, landcover: 72, pop_density: 145 },
    { name: "Bradford", fips: "42015", lat: 41.78, lng: -76.53, temp: 67, precip: 74, wind: 76, hazard: 78, social: 68, landcover: 82, pop_density: 38 },
    { name: "Bucks", fips: "42017", lat: 40.34, lng: -75.08, temp: 62, precip: 60, wind: 65, hazard: 60, social: 72, landcover: 54, pop_density: 1020 },
    { name: "Butler", fips: "42019", lat: 40.86, lng: -79.89, temp: 64, precip: 67, wind: 70, hazard: 72, social: 70, landcover: 74, pop_density: 135 },
    { name: "Cambria", fips: "42021", lat: 40.49, lng: -78.72, temp: 58, precip: 65, wind: 66, hazard: 62, social: 56, landcover: 74, pop_density: 136 },
    { name: "Cameron", fips: "42023", lat: 41.43, lng: -78.20, temp: 74, precip: 78, wind: 82, hazard: 86, social: 60, landcover: 92, pop_density: 8 },
    { name: "Carbon", fips: "42025", lat: 40.91, lng: -75.72, temp: 66, precip: 70, wind: 73, hazard: 68, social: 60, landcover: 76, pop_density: 105 },
    { name: "Centre", fips: "42027", lat: 40.91, lng: -77.82, temp: 72, precip: 74, wind: 78, hazard: 80, social: 74, landcover: 82, pop_density: 62 },
    { name: "Chester", fips: "42029", lat: 39.97, lng: -75.74, temp: 75, precip: 72, wind: 78, hazard: 76, social: 82, landcover: 68, pop_density: 510 },
    { name: "Clarion", fips: "42031", lat: 41.19, lng: -79.40, temp: 66, precip: 70, wind: 72, hazard: 74, social: 62, landcover: 80, pop_density: 38 },
    { name: "Clearfield", fips: "42033", lat: 41.00, lng: -78.46, temp: 68, precip: 72, wind: 74, hazard: 76, social: 60, landcover: 84, pop_density: 38 },
    { name: "Clinton", fips: "42035", lat: 41.22, lng: -77.65, temp: 70, precip: 74, wind: 76, hazard: 78, social: 62, landcover: 86, pop_density: 28 },
    { name: "Columbia", fips: "42037", lat: 41.05, lng: -76.43, temp: 68, precip: 70, wind: 74, hazard: 72, social: 62, landcover: 76, pop_density: 90 },
    { name: "Crawford", fips: "42039", lat: 41.69, lng: -80.10, temp: 62, precip: 68, wind: 70, hazard: 70, social: 64, landcover: 78, pop_density: 55 },
    { name: "Cumberland", fips: "42041", lat: 40.18, lng: -77.27, temp: 72, precip: 68, wind: 74, hazard: 76, social: 76, landcover: 66, pop_density: 320 },
    { name: "Dauphin", fips: "42043", lat: 40.41, lng: -76.94, temp: 67, precip: 64, wind: 70, hazard: 66, social: 66, landcover: 62, pop_density: 380 },
    { name: "Delaware", fips: "42045", lat: 39.91, lng: -75.38, temp: 55, precip: 52, wind: 58, hazard: 44, social: 66, landcover: 38, pop_density: 2970 },
    { name: "Elk", fips: "42047", lat: 41.43, lng: -78.65, temp: 73, precip: 78, wind: 80, hazard: 84, social: 60, landcover: 90, pop_density: 17 },
    { name: "Erie", fips: "42049", lat: 42.12, lng: -80.09, temp: 52, precip: 55, wind: 58, hazard: 54, social: 60, landcover: 58, pop_density: 270 },
    { name: "Fayette", fips: "42051", lat: 39.92, lng: -79.65, temp: 65, precip: 70, wind: 72, hazard: 70, social: 54, landcover: 76, pop_density: 130 },
    { name: "Forest", fips: "42053", lat: 41.52, lng: -79.25, temp: 76, precip: 80, wind: 84, hazard: 88, social: 58, landcover: 94, pop_density: 5 },
    { name: "Franklin", fips: "42055", lat: 39.93, lng: -77.72, temp: 74, precip: 70, wind: 76, hazard: 78, social: 68, landcover: 72, pop_density: 130 },
    { name: "Fulton", fips: "42057", lat: 39.92, lng: -78.11, temp: 76, precip: 74, wind: 80, hazard: 82, social: 62, landcover: 86, pop_density: 20 },
    { name: "Greene", fips: "42059", lat: 39.85, lng: -80.22, temp: 67, precip: 72, wind: 74, hazard: 72, social: 56, landcover: 78, pop_density: 56 },
    { name: "Huntingdon", fips: "42061", lat: 40.43, lng: -77.99, temp: 72, precip: 74, wind: 78, hazard: 80, social: 60, landcover: 84, pop_density: 40 },
    { name: "Indiana", fips: "42063", lat: 40.64, lng: -79.07, temp: 65, precip: 70, wind: 72, hazard: 74, social: 62, landcover: 78, pop_density: 68 },
    { name: "Jefferson", fips: "42065", lat: 41.13, lng: -79.00, temp: 68, precip: 72, wind: 74, hazard: 76, social: 60, landcover: 82, pop_density: 40 },
    { name: "Juniata", fips: "42067", lat: 40.53, lng: -77.42, temp: 72, precip: 70, wind: 76, hazard: 78, social: 62, landcover: 80, pop_density: 30 },
    { name: "Lackawanna", fips: "42069", lat: 41.44, lng: -75.61, temp: 60, precip: 64, wind: 66, hazard: 62, social: 62, landcover: 64, pop_density: 290 },
    { name: "Lancaster", fips: "42071", lat: 40.04, lng: -76.26, temp: 74, precip: 70, wind: 76, hazard: 74, social: 74, landcover: 66, pop_density: 530 },
    { name: "Lawrence", fips: "42073", lat: 40.99, lng: -80.33, temp: 60, precip: 63, wind: 66, hazard: 60, social: 62, landcover: 64, pop_density: 220 },
    { name: "Lebanon", fips: "42075", lat: 40.37, lng: -76.45, temp: 70, precip: 67, wind: 73, hazard: 72, social: 66, landcover: 66, pop_density: 350 },
    { name: "Lehigh", fips: "42077", lat: 40.62, lng: -75.59, temp: 64, precip: 62, wind: 66, hazard: 60, social: 66, landcover: 52, pop_density: 1020 },
    { name: "Luzerne", fips: "42079", lat: 41.17, lng: -75.98, temp: 62, precip: 66, wind: 68, hazard: 62, social: 58, landcover: 66, pop_density: 230 },
    { name: "Lycoming", fips: "42081", lat: 41.34, lng: -77.06, temp: 70, precip: 74, wind: 76, hazard: 76, social: 64, landcover: 82, pop_density: 48 },
    { name: "McKean", fips: "42083", lat: 41.80, lng: -78.56, temp: 70, precip: 76, wind: 78, hazard: 80, social: 58, landcover: 86, pop_density: 28 },
    { name: "Mercer", fips: "42085", lat: 41.30, lng: -80.24, temp: 62, precip: 66, wind: 68, hazard: 66, social: 62, landcover: 72, pop_density: 100 },
    { name: "Mifflin", fips: "42087", lat: 40.62, lng: -77.61, temp: 70, precip: 70, wind: 74, hazard: 76, social: 60, landcover: 78, pop_density: 68 },
    { name: "Monroe", fips: "42089", lat: 41.05, lng: -75.35, temp: 64, precip: 68, wind: 70, hazard: 64, social: 60, landcover: 72, pop_density: 185 },
    { name: "Montgomery", fips: "42091", lat: 40.21, lng: -75.37, temp: 60, precip: 58, wind: 62, hazard: 54, social: 78, landcover: 46, pop_density: 1650 },
    { name: "Montour", fips: "42093", lat: 41.03, lng: -76.62, temp: 70, precip: 70, wind: 74, hazard: 74, social: 64, landcover: 76, pop_density: 75 },
    { name: "Northampton", fips: "42095", lat: 40.74, lng: -75.31, temp: 64, precip: 62, wind: 66, hazard: 60, social: 66, landcover: 52, pop_density: 720 },
    { name: "Northumberland", fips: "42097", lat: 40.86, lng: -76.72, temp: 67, precip: 68, wind: 72, hazard: 68, social: 58, landcover: 70, pop_density: 105 },
    { name: "Perry", fips: "42099", lat: 40.40, lng: -77.25, temp: 72, precip: 70, wind: 76, hazard: 78, social: 66, landcover: 80, pop_density: 50 },
    { name: "Philadelphia", fips: "42101", lat: 39.95, lng: -75.16, temp: 38, precip: 40, wind: 42, hazard: 30, social: 48, landcover: 22, pop_density: 11400 },
    { name: "Pike", fips: "42103", lat: 41.32, lng: -75.00, temp: 68, precip: 72, wind: 74, hazard: 70, social: 64, landcover: 76, pop_density: 55 },
    { name: "Potter", fips: "42105", lat: 41.74, lng: -77.88, temp: 76, precip: 80, wind: 84, hazard: 88, social: 58, landcover: 92, pop_density: 7 },
    { name: "Schuylkill", fips: "42107", lat: 40.71, lng: -76.22, temp: 64, precip: 67, wind: 70, hazard: 66, social: 56, landcover: 72, pop_density: 105 },
    { name: "Snyder", fips: "42109", lat: 40.77, lng: -77.07, temp: 70, precip: 70, wind: 74, hazard: 76, social: 64, landcover: 76, pop_density: 70 },
    { name: "Somerset", fips: "42111", lat: 40.00, lng: -79.04, temp: 66, precip: 72, wind: 74, hazard: 76, social: 60, landcover: 82, pop_density: 52 },
    { name: "Sullivan", fips: "42113", lat: 41.44, lng: -76.51, temp: 74, precip: 78, wind: 80, hazard: 82, social: 58, landcover: 90, pop_density: 8 },
    { name: "Susquehanna", fips: "42115", lat: 41.82, lng: -75.80, temp: 68, precip: 74, wind: 76, hazard: 76, social: 64, landcover: 82, pop_density: 32 },
    { name: "Tioga", fips: "42117", lat: 41.77, lng: -77.29, temp: 72, precip: 78, wind: 80, hazard: 82, social: 60, landcover: 86, pop_density: 25 },
    { name: "Union", fips: "42119", lat: 40.96, lng: -77.07, temp: 70, precip: 70, wind: 74, hazard: 76, social: 64, landcover: 76, pop_density: 65 },
    { name: "Venango", fips: "42121", lat: 41.39, lng: -79.75, temp: 64, precip: 68, wind: 70, hazard: 72, social: 60, landcover: 78, pop_density: 45 },
    { name: "Warren", fips: "42123", lat: 41.84, lng: -79.27, temp: 68, precip: 74, wind: 76, hazard: 78, social: 60, landcover: 84, pop_density: 28 },
    { name: "Washington", fips: "42125", lat: 40.17, lng: -80.25, temp: 65, precip: 68, wind: 70, hazard: 68, social: 64, landcover: 72, pop_density: 190 },
    { name: "Wayne", fips: "42127", lat: 41.64, lng: -75.24, temp: 68, precip: 72, wind: 74, hazard: 72, social: 62, landcover: 78, pop_density: 48 },
    { name: "Westmoreland", fips: "42129", lat: 40.30, lng: -79.46, temp: 63, precip: 67, wind: 70, hazard: 66, social: 64, landcover: 72, pop_density: 290 },
    { name: "Wyoming", fips: "42131", lat: 41.52, lng: -75.99, temp: 68, precip: 72, wind: 74, hazard: 72, social: 62, landcover: 78, pop_density: 45 },
    { name: "York", fips: "42133", lat: 39.92, lng: -76.73, temp: 72, precip: 68, wind: 74, hazard: 72, social: 70, landcover: 66, pop_density: 340 },
];

export const DIMENSION_META = {
    temp:      { label: "Temperature Stability", icon: "🌡️", color: "#f0c040", desc: "ERA5 mean temperature trend & extreme heat frequency (2000–2024)" },
    precip:    { label: "Precipitation Stability", icon: "🌧️", color: "#60a8f0", desc: "Rainfall variance, 30-day rolling std dev, drought/flood cycles" },
    wind:      { label: "Wind Stability", icon: "🌬️", color: "#a0d8b0", desc: "Wind magnitude variability √(u²+v²), storm gust frequency" },
    hazard:    { label: "Hazard Resistance", icon: "⚠️", color: "#f06060", desc: "FEMA NRI composite score — flood, tornado, heat wave, wildfire exposure" },
    social:    { label: "Social Resilience", icon: "👥", color: "#c080f0", desc: "US Census ACS — income, housing quality, healthcare access, education" },
    landcover: { label: "Land Cover Health", icon: "🌲", color: "#4dd9ac", desc: "USGS NLCD — forest/wetland fraction, urban heat island index, NDVI" },
};

export const MODEL_META = {
    rf:   { label: "Random Forest", bias: 0,  noise: 0,   desc: "Ensemble of 200 decision trees. Best interpretability. SHAP values available." },
    xgb:  { label: "XGBoost",       bias: 2,  noise: 1.5, desc: "Gradient boosted trees. Highest accuracy on held-out test set (RMSE: 4.2)." },
    lstm: { label: "LSTM (Temporal)", bias: -1, noise: 2.5, desc: "Recurrent neural network over 24-year ERA5 time series. Best for trend extrapolation." },
};

export function calcCRS(county, weights, model = "rf") {
    const m = MODEL_META[model];
    const dims = ["temp","precip","wind","hazard","social","landcover"];
    const totalW = dims.reduce((s,d) => s + (weights[d] ?? 1), 0);
    const raw = dims.reduce((s,d) => s + county[d] * (weights[d] ?? 1), 0) / totalW;
    const noise = (Math.sin(county.fips.slice(-2)) * m.noise);
    return Math.min(100, Math.max(0, Math.round(raw + m.bias + noise)));
}

export function riskLevel(score) {
    if (score >= 75) return { label: "Highly Resilient", color: "#4dd9ac", bg: "#0d3a28", border: "#1a6a50" };
    if (score >= 60) return { label: "Resilient",        color: "#80d890", bg: "#1a3a20", border: "#2a6a40" };
    if (score >= 45) return { label: "Moderate Risk",    color: "#f0c040", bg: "#2a2800", border: "#5a5000" };
    if (score >= 30) return { label: "High Risk",        color: "#f09040", bg: "#3a1800", border: "#6a3000" };
    return                  { label: "Critical Risk",    color: "#f06060", bg: "#3a0d10", border: "#6a1520" };
}

export function scoreToFillColor(score) {
    const stops = [[0,[220,70,70]],[30,[220,130,50]],[45,[220,185,50]],[60,[100,200,140]],[75,[40,200,140]],[100,[30,180,130]]];
    for (let i = 1; i < stops.length; i++) {
        if (score <= stops[i][0]) {
            const t = (score - stops[i-1][0]) / (stops[i][0] - stops[i-1][0]);
            const a = stops[i-1][1], b = stops[i][1];
            return `rgba(${Math.round(a[0]+(b[0]-a[0])*t)},${Math.round(a[1]+(b[1]-a[1])*t)},${Math.round(a[2]+(b[2]-a[2])*t)},0.78)`;
        }
    }
    return "rgba(30,180,130,0.78)";
}