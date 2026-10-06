import { getWeatherInfo } from "./CurrentWeather";

function getDayName(dateString, index) {
  if (index === 0) return "Today";
  return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-US", { weekday: "short" });
}

function DailyForecast({ weather }) {
  const daily = weather.daily;
  const days = daily.time.slice(0, 5).map((date, index) => ({
    date,
    day: getDayName(date, index),
    ...getWeatherInfo(daily.weather_code[index]),
    high: Math.round(daily.temperature_2m_max[index]),
    low: Math.round(daily.temperature_2m_min[index]),
  }));

  return (
    <section className="section-block">
      <div className="section-heading">
        <div>
          <span className="eyebrow">FORECAST</span>
          <h2>5-Day forecast</h2>
        </div>
        <span className="section-note">°C</span>
      </div>

      <div className="daily-grid">
        {days.map((day) => (
          <article className={`day-card ${day.day === "Today" ? "selected" : ""}`} key={day.date}>
            <span className="day-name">{day.day}</span>
            <span className={`mini-weather ${day.tone}`} aria-hidden="true">{day.icon}</span>
            <strong>{day.high}°</strong>
            <span>{day.low}°</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export default DailyForecast;
