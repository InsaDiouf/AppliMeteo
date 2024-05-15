import React, { useState } from "react";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [coordinates, setCoordinates] = useState({ latitude: "", longitude: "" });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    fetchWeatherData();
  };

  const fetchWeatherData = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=f514e5ddd4d77105772285b19e537b05&units=metric`
    )
      .then((result) => result.json())
      .then((jsonResult) => {
        setWeatherData(jsonResult);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <div className="form-container">
        <form onSubmit={handleFormSubmit}>
          <div className="input-container">
            <input
              type="text"
              value={coordinates.latitude}
              onChange={(e) => setCoordinates({ ...coordinates, latitude: e.target.value })}
              placeholder="Latitude"
              required
            />
            <label>Latitude</label>
          </div>
          <div className="input-container">
            <input
              type="text"
              value={coordinates.longitude}
              onChange={(e) => setCoordinates({ ...coordinates, longitude: e.target.value })}
              placeholder="Longitude"
              required
            />
            <label>Longitude</label>
          </div>
          <button type="submit">Obtenir la météo</button>
        </form>
      </div>
      <div className="weather-container">
        {loading ? (
          <div className="loading">Chargement...</div>
        ) : weatherData ? (
          <div>
            <h2>Mon Application Météo</h2>
            <p>Ville: {weatherData.name}</p>
            <p>Température: {weatherData.main.temp} °C</p>
            <p>Description: {weatherData.weather[0].description}</p>
            <p>Lever du soleil: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
            <p>Coucher du soleil: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
            <p>Humidité: {weatherData.main.humidity} %</p>
            <p>Visibilité: {weatherData.visibility} m</p>
            <p>Point de rosée: {weatherData.main.dew_point} °C</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
