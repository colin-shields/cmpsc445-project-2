import { useEffect, useMemo, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = "pk.eyJ1IjoibWpvc2V3aW5ncyIsImEiOiJjbW9nOGIxazMwM3hrMnFxNmM5enN2MTQ2In0.c99hPehkIYngaRvJGGCoGg";

function colorForScore(score) {
  if (score >= 75) return "#35d1a3";
  if (score >= 55) return "#f2c14e";
  return "#ff6b6b";
}

export default function MapView({ counties, selectedCounty, onSelectCounty, theme }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const popupRef = useRef(null);

  const geojson = useMemo(
    () => ({
      type: "FeatureCollection",
      features: counties.map((county) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [county.lng, county.lat],
        },
        properties: {
          fips: county.fips,
          name: county.name,
          scenarioRank: county.scenarioRank,
          scenarioScore: county.scenarioScore,
          color: colorForScore(county.scenarioScore),
        },
      })),
    }),
    [counties]
  );

  useEffect(() => {
    popupRef.current?.remove();
    mapRef.current?.remove();

    mapRef.current = new mapboxgl.Map({
      container: containerRef.current,
      style: theme === "dark" ? "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/mapbox/light-v11",
      center: [-77.7, 40.9],
      zoom: 6.1,
      minZoom: 5.4,
    });

    mapRef.current.on("load", () => {
      mapRef.current.addSource("counties", {
        type: "geojson",
        data: geojson,
      });

      mapRef.current.addLayer({
        id: "county-circles",
        type: "circle",
        source: "counties",
        paint: {
          "circle-radius": ["interpolate", ["linear"], ["get", "scenarioScore"], 0, 5, 100, 15],
          "circle-color": ["get", "color"],
          "circle-opacity": 0.88,
          "circle-stroke-width": 1.5,
          "circle-stroke-color": theme === "dark" ? "#081018" : "#ffffff",
        },
      });

      mapRef.current.on("click", "county-circles", (event) => {
        const feature = event.features?.[0];
        if (!feature) return;
        const county = counties.find((entry) => entry.fips === feature.properties.fips);
        if (county) onSelectCounty(county);
      });

      mapRef.current.on("mousemove", "county-circles", (event) => {
        const feature = event.features?.[0];
        if (!feature) return;
        mapRef.current.getCanvas().style.cursor = "pointer";

        const coordinates = feature.geometry.coordinates.slice();
        const html = `
          <div class="map-popup">
            <strong>${feature.properties.name}</strong><br/>
            Rank #${feature.properties.scenarioRank}<br/>
            Score ${feature.properties.scenarioScore}
          </div>
        `;

        popupRef.current?.remove();
        popupRef.current = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
          offset: 12,
        })
          .setLngLat(coordinates)
          .setHTML(html)
          .addTo(mapRef.current);
      });

      mapRef.current.on("mouseleave", "county-circles", () => {
        mapRef.current.getCanvas().style.cursor = "";
        popupRef.current?.remove();
      });
    });

    return () => {
      popupRef.current?.remove();
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [theme, geojson, counties, onSelectCounty]);

  useEffect(() => {
    if (!selectedCounty || !mapRef.current) return;
    mapRef.current.flyTo({
      center: [selectedCounty.lng, selectedCounty.lat],
      zoom: 7.3,
      essential: true,
    });
  }, [selectedCounty]);

  return (
    <section className="panel map-panel">
      <div className="panel-title">Pennsylvania County Map</div>
      <div className="map-frame" ref={containerRef} />
      <div className="map-legend">
        <span><i className="legend-dot safe" /> Safer</span>
        <span><i className="legend-dot watch" /> Watchlist</span>
        <span><i className="legend-dot risk" /> Higher stress</span>
      </div>
    </section>
  );
}
