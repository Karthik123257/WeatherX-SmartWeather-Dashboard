import { useEffect, useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";
import WeatherDetails from "./components/WeatherDetails";
import { getWeatherByCity } from "./services/weatherApi";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadWeather = async (city) => {
    try {
      setLoading(true);
      setError("");
      const data = await getWeatherByCity(city);
      setWeatherData(data);
    } catch (err) {
      setError(err.message || "Unable to load weather.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather("Hyderabad");
  }, []);

  return (
    <div className="app">
      <Header />

      <main className="weather-dashboard">
        <section className="search-section">
          <div>
            <span className="eyebrow">WEATHERX</span>
            <h1>Weather, wherever you are.</h1>
            <p>Search a city to get live conditions, forecasts and useful weather details.</p>
          </div>
          <SearchBar onSearch={loadWeather} loading={loading} />
        </section>

        {loading && !weatherData && (
          <div className="status-card">Loading weather data...</div>
        )}

        {error && (
          <div className="status-card error-card">
            <strong>Couldn't find that city</strong>
            <span>{error}</span>
          </div>
        )}

        {weatherData && !error && (
          <>
            <CurrentWeather weather={weatherData.weather} location={weatherData.location} />
            <DailyForecast weather={weatherData.weather} />
            <HourlyForecast weather={weatherData.weather} />
            <WeatherDetails weather={weatherData.weather} />
          </>
        )}
      </main>

      <footer className="footer">
        <span>WeatherX</span>
        <span>Powered by Open-Meteo</span>
      </footer>
    </div>
  );
}

export default App;
