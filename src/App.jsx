import { useState } from "react";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    try {
      const res = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=dda2fdd34b434952be391846243112&q=${city}&aqi=no`
      );
      const data = await res.json();

      if (data.error) {
        setError(data.error.message);
        setWeatherData(null);
      } else {
        setWeatherData(data);
        setError(null);
      }
    } catch (error) {
      setError("Failed to fetch weather data.");
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Weather App</h1>
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-6 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={fetchWeatherData}
          className="bg-black text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Go
        </button>
      </div>

      
      {error && <p className="text-red-500 mb-4">{error}</p>}

     
      {weatherData && (
        <div className="mb-6">
          <img
            src={weatherData.current.condition.icon}
            alt="Weather Icon"
            className="w-20 h-20"
          />
        </div>
      )}

      
      {weatherData && (
        <div className="w-80 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold">{weatherData.location.name}</h2>
          <p className="text-5xl font-bold text-blue-600 mb-4">
            {weatherData.current.temp_c}°C
          </p>
          <p className="text-lg text-gray-700 mb-4">
            {weatherData.current.condition.text}
          </p>
          <p>Feels Like: {weatherData.current.feelslike_c}°C</p>
          <p>Humidity: {weatherData.current.humidity}%</p>
          <p>Longitude: {weatherData.location.lon}</p>
          <p>Latitude: {weatherData.location.lat}</p>
          <p className="mt-4 text-sm">MADE BY PRAGATI SHARMA</p>
        </div>
      )}
    </div>
  );
}

export default App;

