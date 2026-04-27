import { DIMENSION_META, MODEL_META, riskLevel } from "../data/countyData";

const DIMS = Object.entries(DIMENSION_META);

export default function RankingsPanel({ scoredCounties, onCountyClick, model, setModel, weights, setWeights }) {
    const posLabel = (i) => {
        if (i === 0) return { text: "#1 — Gold", cls: "gold" };
        if (i === 1) return { text: "#2 — Silver", cls: "silver" };
        if (i === 2) return { text: "#3 — Bronze", cls: "bronze" };
        return { text: `#${i + 1}`, cls: "" };
    };

    return (
        <div className="rankings-page">
            <div className="rankings-main">
                <div className="rankings-title">County <span style={{ color: "var(--teal)" }}>Rankings</span></div>
                <div className="rankings-subtitle">All 67 Pennsylvania counties ranked by Climate Resilience Score · {MODEL_META[model].label}</div>
                <div className="rankings-grid">
                    {scoredCounties.map((county, i) => {
                        const risk = riskLevel(county.crs);
                        const pos = posLabel(i);
                        return (
                            <div
                                key={county.fips}
                                className={`ranking-card ${i < 3 ? "top3" : ""}`}
                                onClick={() => onCountyClick(county)}
                            >
                                <div className={`ranking-pos ${pos.cls}`}>{pos.text}</div>
                                <div className="ranking-name">{county.name}</div>
                                <div className="ranking-crs" style={{ color: risk.color }}>{county.crs}</div>
                                <span
                                    className="ranking-badge"
                                    style={{ background: risk.bg, color: risk.color, border: `1px solid ${risk.border}` }}
                                >
                  {risk.label}
                </span>
                                <div className="ranking-mini-bars">
                                    {DIMS.slice(0, 3).map(([key, meta]) => (
                                        <div key={key} className="ranking-mini-bar">
                                            <div className="ranking-mini-fill" style={{ width: `${county[key]}%`, background: meta.color }} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="rankings-controls">
                <div className="panel-label" style={{ marginBottom: 12 }}>Model</div>
                {Object.entries(MODEL_META).map(([key, m]) => (
                    <button
                        key={key}
                        className={`model-tab ${model === key ? "active" : ""}`}
                        onClick={() => setModel(key)}
                        style={{ width: "100%", marginBottom: 4 }}
                    >
                        <span className="model-tab-name">{m.label}</span>
                        <span className="model-tab-desc">{m.desc}</span>
                    </button>
                ))}
                <div className="panel-label" style={{ marginTop: 20, marginBottom: 12 }}>Weights</div>
                {DIMS.map(([key, meta]) => (
                    <div className="weight-row" key={key}>
                        <div className="weight-header">
              <span>
                <span style={{ marginRight: 4 }}>{meta.icon}</span>
                <span className="weight-name">{meta.label.split(" ")[0]}</span>
              </span>
                            <span className="weight-val">{Math.round((weights[key] ?? 1) * 100)}%</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="200"
                            step="5"
                            value={Math.round((weights[key] ?? 1) * 100)}
                            onChange={e => setWeights(w => ({ ...w, [key]: parseInt(e.target.value) / 100 }))}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}