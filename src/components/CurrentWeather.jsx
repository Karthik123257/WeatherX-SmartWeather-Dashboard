function getWeatherInfo(code) {
  if (code === 0) return { icon: "☀", label: "Clear sky", tone: "sunny" };
  if (code === 1) return { icon: "◐", label: "Mainly clear", tone: "sunny" };
  if (code === 2) return { icon: "◑", label: "Partly cloudy", tone: "cloudy" };
  if (code === 3) return { icon: "☁", label: "Overcast", tone: "cloudy" };
  if (code === 45 || code === 48) return { icon: "≋", label: "Fog", tone: "fog" };
  if (code >= 51 && code <= 57) return { icon: "☂", label: "Drizzle", tone: "rain" };
  if (code >= 61 && code <= 67) return { icon: "☂", label: "Rain", tone: "rain" };
  if (code >= 71 && code <= 77) return { icon: "❄", label: "Snow", tone: "snow" };
  if (code >= 80 && code <= 82) return { icon: "☂", label: "Rain showers", tone: "rain" };
  if (code >= 85 && code <= 86) return { icon: "❄", label: "Snow showers", tone: "snow" };
  if (code >= 95) return { icon: "ϟ", label: "Thunderstorm", tone: "storm" };
  return { icon: "◐", label: "Weather", tone: "cloudy" };
}

function formatUpdatedTime(time, timezone) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: timezone,
    }).format(new Date(`${time}:00`));
  } catch {
    return "Now";
  }
}

function CurrentWeather({ weather, location }) {
  const current = weather.current;
  const daily = weather.daily;
  const info = getWeatherInfo(current.weather_code);

  return (
    <section className={`hero-card ${info.tone}`}>
      <div className="hero-topline">
        <div>
          <span className="eyebrow">CURRENT WEATHER</span>
          <h1>{location.name}</h1>
          <p>
            {[location.admin1, location.country].filter(Boolean).join(", ")}
          </p>
        </div>
        <span className="updated">
          Updated {formatUpdatedTime(current.time, weather.timezone)}
        </span>
      </div>

      <div className="hero-main">
        <div className="weather-symbol" aria-hidden="true">{info.icon}</div>
        <div className="hero-temperature">
          <span>{Math.round(current.temperature_2m)}</span>
          <sup>°C</sup>
        </div>
        <div className="condition-block">
          <strong>{info.label}</strong>
          <span>Feels like {Math.round(current.apparent_temperature)}°</span>
          <span>H {Math.round(daily.temperature_2m_max[0])}° · L {Math.round(daily.temperature_2m_min[0])}°</span>
        </div>
      </div>

      <div className="hero-stats">
        <div><span>Humidity</span><strong>{Math.round(current.relative_humidity_2m)}%</strong></div>
        <div><span>Wind</span><strong>{Math.round(current.wind_speed_10m)} km/h</strong></div>
        <div><span>Pressure</span><strong>{Math.round(current.surface_pressure)} hPa</strong></div>
        <div><span>Visibility</span><strong>{Math.round(current.visibility / 1000)} km</strong></div>
      </div>
    </section>
  );
}

export { getWeatherInfo };
export default CurrentWeather;
