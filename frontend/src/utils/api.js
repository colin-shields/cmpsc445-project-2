import countyData from "../data/pa_county_climate_risk.json";

const DEFAULT_WEIGHTS = {
  heat: 1,
  flood: 1,
  drought: 0.8,
  exposure: 1,
  social: 1,
  growth: 0.4,
};

const METADATA = {
  dataset: "NASA SEDAC U.S. Climate Risk Projections by County, 2040-2049",
  methodology:
    "County ranking from NASA projected climate risk data with scenario weighting over safety dimensions.",
  dimensions: [
    "overallSafety",
    "heatSafety",
    "floodSafety",
    "droughtSafety",
    "exposureSafety",
    "socialSafety",
    "growthPressure",
  ],
  sources: [
    {
      name: "NASA Earthdata / SEDAC Climate Risk Projections",
      url: "https://www.earthdata.nasa.gov/data/catalog/esdis-ciesin-sedac-crv-uscrpc-2040-2049-1.00",
    },
    {
      name: "FEMA National Risk Index",
      url: "https://hazards.fema.gov/nri/data-resources",
    },
    {
      name: "CDC Social Vulnerability Index",
      url: "https://svi.cdc.gov/dataDownloads/data-download.html",
    },
    {
      name: "U.S. Census ACS API",
      url: "https://www.census.gov/programs-surveys/acs/data/data-via-api.html",
    },
    {
      name: "NOAA Climate Normals",
      url: "https://www.ncei.noaa.gov/products/land-based-station/us-climate-normals",
    },
  ],
};

function computeScenarioScore(county, weights) {
  const normalized = {
    heat: county.scores.heatSafety,
    flood: county.scores.floodSafety,
    drought: county.scores.droughtSafety,
    exposure: county.scores.exposureSafety,
    social: county.scores.socialSafety,
    growth: 100 - county.scores.growthPressure,
  };

  const totalWeight = Object.values(weights).reduce((sum, value) => sum + value, 0);
  const weighted =
    normalized.heat * weights.heat +
    normalized.flood * weights.flood +
    normalized.drought * weights.drought +
    normalized.exposure * weights.exposure +
    normalized.social * weights.social +
    normalized.growth * weights.growth;

  return Number((weighted / totalWeight).toFixed(1));
}

function summarize(counties) {
  const scores = counties.map((county) => county.scenarioScore);
  const averageScore = scores.reduce((sum, value) => sum + value, 0) / scores.length;
  const safestCounty = counties[0];
  const highestRiskCounty = counties[counties.length - 1];
  const strongestHeatCounty = [...counties].sort((a, b) => b.scores.heatSafety - a.scores.heatSafety)[0];

  return {
    countyCount: counties.length,
    averageScore: Number(averageScore.toFixed(1)),
    safestCounty: {
      fips: safestCounty.fips,
      name: safestCounty.name,
      score: safestCounty.scenarioScore,
    },
    highestRiskCounty: {
      fips: highestRiskCounty.fips,
      name: highestRiskCounty.name,
      score: highestRiskCounty.scenarioScore,
    },
    strongestHeatCounty: {
      fips: strongestHeatCounty.fips,
      name: strongestHeatCounty.name,
      score: strongestHeatCounty.scores.heatSafety,
    },
  };
}

export function buildScenario(weightsInput = DEFAULT_WEIGHTS) {
  const weights = {
    heat: Number(weightsInput.heat),
    flood: Number(weightsInput.flood),
    drought: Number(weightsInput.drought),
    exposure: Number(weightsInput.exposure),
    social: Number(weightsInput.social),
    growth: Number(weightsInput.growth),
  };

  const counties = countyData
    .map((county) => ({
      ...county,
      scenarioScore: computeScenarioScore(county, weights),
    }))
    .sort((a, b) => b.scenarioScore - a.scenarioScore)
    .map((county, index) => ({
      ...county,
      scenarioRank: index + 1,
    }));

  return {
    weights,
    counties,
    summary: summarize(counties),
  };
}

export function getMetadata() {
  return METADATA;
}
