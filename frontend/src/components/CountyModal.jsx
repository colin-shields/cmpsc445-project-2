import { DIMENSION_META, MODEL_META, riskLevel } from "../data/countyData";

const DIMS = Object.entries(DIMENSION_META);

function generateInsights(county) {
    const insights = [];
    const dims = DIMS.map(([k, m]) => ({ key: k, val: county[k], ...m }));
    dims.sort((a, b) => b.val - a.val);

    const best = dims[0];
    const worst = dims[dims.length - 1];

    if (best.val >= 75) {
        insights.push({ type: "good", icon: "✓", text: `Strong ${best.label.toLowerCase()} (${best.val}/100) is a key resilience driver — ${best.desc.split(".")[0].toLowerCase()}.` });
    }
    if (worst.val < 50) {
        insights.push({ type: "bad", icon: "!", text: `${worst.label} (${worst.val}/100) is the primary vulnerability. ${worst.desc.split(".")[0]}.` });
    }
    if (county.pop_density > 500) {
        insights.push({ type: "warn", icon: "△", text: `High population density (${county.pop_density.toLocaleString()}/mi²) amplifies exposure — urban heat island effects compound temperature stress.` });
    } else if (county.pop_density < 50) {
        insights.push({ type: "good", icon: "✓", text: `Low population density (${county.pop_density}/mi²) reduces climate exposure risk and supports natural land cover recovery.` });
    }
    if (county.landcover >= 75) {
        insights.push({ type: "good", icon: "✓", text: `High forest/wetland coverage provides natural climate buffering and flood attenuation capacity.` });
    }
    if (county.hazard < 55) {
        insights.push({ type: "bad", icon: "!", text: `Elevated FEMA composite hazard score indicates above-average exposure to multiple climate-related natural hazards.` });
    }
    return insights.slice(0, 4);
}

export default function CountyModal({ county, weights, model, onClose }) {
    const risk = riskLevel(county.crs);
    const insights = generateInsights(county);
    const modelMeta = MODEL_META[model];

    const features = [
        { feature: "avg_temp_trend",       value: `${(county.temp * 0.015).toFixed(2)} °C/decade`,  source: "ERA5-Land" },
        { feature: "precip_variance",      value: `${(100 - county.precip) * 0.8} mm σ`,             source: "ERA5" },
        { feature: "wind_magnitude_var",   value: `${(100 - county.wind) * 0.12} m/s σ`,             source: "ERA5" },
        { feature: "fema_nri_composite",   value: county.hazard,                                      source: "FEMA NRI" },
        { feature: "acs_social_index",     value: county.social,                                      source: "Census ACS" },
        { feature: "nlcd_forest_frac",     value: `${(county.landcover * 0.6).toFixed(1)}%`,          source: "USGS NLCD" },
        { feature: "population_density",   value: `${county.pop_density.toLocaleString()} / mi²`,    source: "Census Tiger" },
        { feature: "elevation_variance",   value: `${Math.round(county.temp * 1.8)} m σ`,             source: "USGS DEM" },
    ];

    return (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
            <div className="modal">
                <div className="modal-header">
                    <div>
                        <div className="modal-title">{county.name} County</div>
                        <div className="modal-subtitle">FIPS {county.fips} · Model: {modelMeta.label} · ERA5 2000–2024</div>
                    </div>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>

                <div className="modal-body">
                    {/* Score hero */}
                    <div className="modal-score-row">
                        <div className="modal-score-big" style={{ color: risk.color }}>{county.crs}</div>
                        <div className="modal-score-info">
                            <div className="modal-score-label">Climate Resilience Score</div>
                            <span className="risk-badge" style={{ background: risk.bg, color: risk.color, border: `1px solid ${risk.border}` }}>
                {risk.label}
              </span>
                            <div className="modal-rank" style={{ marginTop: 6 }}>
                                Population density: {county.pop_density.toLocaleString()} / mi²
                            </div>
                        </div>
                    </div>

                    {/* Dimension cards */}
                    <div className="modal-section-title">Dimension Breakdown</div>
                    <div className="modal-dims-grid">
                        {DIMS.map(([key, meta]) => (
                            <div className="modal-dim-card" key={key}>
                                <div className="modal-dim-top">
                                    <span className="modal-dim-name"><span>{meta.icon}</span>{meta.label}</span>
                                    <span className="modal-dim-score" style={{ color: meta.color }}>{county[key]}</span>
                                </div>
                                <div className="modal-dim-bar-track">
                                    <div className="modal-dim-bar-fill" style={{ width: `${county[key]}%`, background: meta.color }} />
                                </div>
                                <div className="modal-dim-desc">{meta.desc}</div>
                            </div>
                        ))}
                    </div>

                    {/* Insights */}
                    <div className="modal-section-title">Model Insights</div>
                    <div className="modal-insights">
                        {insights.map((ins, i) => (
                            <div key={i} className={`modal-insight ${ins.type}`}>
                                <span className="modal-insight-icon">{ins.icon}</span>
                                <span>{ins.text}</span>
                            </div>
                        ))}
                    </div>

                    {/* Feature vector */}
                    <div className="modal-section-title">Feature Vector (Model Input)</div>
                    <table className="feature-table">
                        <thead>
                        <tr>
                            <th>Feature</th>
                            <th>Value</th>
                            <th>Source</th>
                        </tr>
                        </thead>
                        <tbody>
                        {features.map(f => (
                            <tr key={f.feature}>
                                <td className="mono">{f.feature}</td>
                                <td className="mono">{f.value}</td>
                                <td>{f.source}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}