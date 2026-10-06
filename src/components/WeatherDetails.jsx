function WeatherDetails({ weather }) {
  const current = weather.current;
  const daily = weather.daily;

  const details = [
    ["Humidity", `${Math.round(current.relative_humidity_2m)}%`, "Relative humidity", "💧"],
    ["Feels like", `${Math.round(current.apparent_temperature)}°C`, "Apparent temperature", "◉"],
    ["Wind", `${Math.round(current.wind_speed_10m)} km/h`, "Current wind", "↗"],
    ["Pressure", `${Math.round(current.surface_pressure)} hPa`, "Surface pressure", "⌁"],
    ["Visibility", `${Math.round(current.visibility / 1000)} km`, "Clear distance", "◌"],
    ["UV index", `${Math.round(daily.uv_index_max?.[0] ?? 0)}`, "Today's maximum", "☀"],
  ];

  return (
    <section className="section-block details-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">WEATHER INFORMATION</span>
          <h2>Today's details</h2>
        </div>
      </div>

      <div className="details-grid">
        {details.map(([label, value, note, icon]) => (
          <article className="detail-card" key={label}>
            <div className="detail-icon" aria-hidden="true">{icon}</div>
            <div>
              <span>{label}</span>
              <strong>{value}</strong>
              <small>{note}</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default WeatherDetails;
