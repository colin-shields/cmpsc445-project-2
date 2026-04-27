export default function Header({
  activeTab,
  onTabChange,
  theme,
  onThemeToggle,
  temperatureUnit,
  onTemperatureUnitChange,
  scenarioLoading,
}) {
  return (
    <header className="topbar">
      <div>
        <div className="brand-kicker">Pennsylvania Climate Safety Index</div>
        <div className="brand-sub">NASA 2040-2049 county risk dashboard</div>
      </div>

      <nav className="tab-strip">
        <button className={activeTab === "dashboard" ? "active" : ""} onClick={() => onTabChange("dashboard")}>
          Dashboard
        </button>
        <button className={activeTab === "method" ? "active" : ""} onClick={() => onTabChange("method")}>
          Method
        </button>
      </nav>

      <div className="header-actions">
        <div className="unit-toggle" role="group" aria-label="Temperature units">
          <button
            className={temperatureUnit === "C" ? "active" : ""}
            onClick={() => onTemperatureUnitChange("C")}
          >
            °C
          </button>
          <button
            className={temperatureUnit === "F" ? "active" : ""}
            onClick={() => onTemperatureUnitChange("F")}
          >
            °F
          </button>
        </div>

        <div className={`status-pill ${scenarioLoading ? "busy" : ""}`}>
          <span className="dot" />
          {scenarioLoading ? "Re-scoring" : "Ready"}
        </div>

        <button className="theme-toggle" onClick={onThemeToggle}>
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </header>
  );
}
