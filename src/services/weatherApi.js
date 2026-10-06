const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

export async function searchCity(city) {
  const response = await fetch(
    `${GEOCODING_URL}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
  );

  if (!response.ok) {
    throw new Error("Unable to search for the city.");
  }

  const data = await response.json();

  if (!data.results?.length) {
    throw new Error(`No city found for “${city}”.`);
  }

  return data.results[0];
}

export async function getWeather(latitude, longitude) {
  const params = new URLSearchParams({
    latitude,
    longitude,
    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,visibility",
    hourly: "temperature_2m,weather_code,is_day,precipitation_probability",
    daily:
      "weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,sunrise,sunset",
    temperature_unit: "celsius",
    wind_speed_unit: "kmh",
    forecast_days: "7",
    timezone: "auto",
  });

  const response = await fetch(`${WEATHER_URL}?${params}`);

  if (!response.ok) {
    throw new Error("Unable to fetch weather data.");
  }

  return response.json();
}

export async function getWeatherByCity(city) {
  const location = await searchCity(city);
  const weather = await getWeather(location.latitude, location.longitude);

  return { location, weather };
}
