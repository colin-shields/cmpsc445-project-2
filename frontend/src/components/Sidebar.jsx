const WEIGHT_FIELDS = [
  ["heat", "Heat Stress"],
  ["flood", "Flooding"],
  ["drought", "Dryness"],
  ["exposure", "Built Exposure"],
  ["social", "Social Vulnerability"],
  ["growth", "Growth Pressure"],
];

export default function Sidebar({ weights, setWeights, summary, selectedCounty }) {
  return (
    <aside className="sidebar panel">
      <div className="panel-title">Scenario Controls</div>
      <p className="sidebar-copy">
        Move the sliders to tell the model what “best in PA” means for your scenario.
      </p>

      <div className="slider-stack">
        {WEIGHT_FIELDS.map(([key, label]) => (
          <label className="slider-group" key={key}>
            <div className="slider-head">
              <span>{label}</span>
              <span>{weights[key].toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0"
              max="3"
              step="0.1"
              value={weights[key]}
              onChange={(event) =>
                setWeights((current) => ({
                  ...current,
                  [key]: Number(event.target.value),
                }))
              }
            />
          </label>
        ))}
      </div>

      <div className="mini-section">
        <div className="mini-section-title">Snapshot</div>
        <div className="snapshot-grid">
          <div className="fact-card">
            <span className="fact-label">Safest county</span>
            <span className="fact-value">{summary?.safestCounty?.name}</span>
          </div>
          <div className="fact-card">
            <span className="fact-label">Highest risk</span>
            <span className="fact-value">{summary?.highestRiskCounty?.name}</span>
          </div>
          <div className="fact-card">
            <span className="fact-label">Selected</span>
            <span className="fact-value">{selectedCounty?.name || "None"}</span>
          </div>
          <div className="fact-card">
            <span className="fact-label">State average</span>
            <span className="fact-value">{summary?.averageScore ?? "--"}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
