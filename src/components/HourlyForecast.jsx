import { getWeatherInfo } from "./CurrentWeather";

function getHourLabel(time, index) {
  if (index === 0) return "Now";
  return new Date(`${time}:00`).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: undefined,
  });
}

function HourlyForecast({ weather }) {
  const hourly = weather.hourly;
  const start = hourly.time.findIndex((time) => time >= weather.current.time);
  const startIndex = start >= 0 ? start : 0;

  const hours = hourly.time.slice(startIndex, startIndex + 8).map((time, index) => ({
    time,
    label: getHourLabel(time, index),
    temperature: Math.round(hourly.temperature_2m[startIndex + index]),
    precipitation: hourly.precipitation_probability?.[startIndex + index] ?? 0,
    ...getWeatherInfo(hourly.weather_code[startIndex + index]),
  }));

  return (
    <section className="section-block">
      <div className="section-heading">
        <div>
          <span className="eyebrow">HOURLY WEATHER</span>
          <h2>Next few hours</h2>
        </div>
        <span className="section-note">Today</span>
      </div>

      <div className="hourly-grid">
        {hours.map((hour) => (
          <article className="hour-card" key={hour.time}>
            <span className="hour-time">{hour.label}</span>
            <span className={`hour-weather ${hour.tone}`} aria-hidden="true">{hour.icon}</span>
            <strong>{hour.temperature}°</strong>
            <small>{hour.precipitation}% rain</small>
          </article>
        ))}
      </div>
    </section>
  );
}

export default HourlyForecast;
