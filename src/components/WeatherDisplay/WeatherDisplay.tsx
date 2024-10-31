import React from 'react';
import { WeatherResponse } from '../../models/WeatherData';

interface WeatherDisplayProps {
  data: WeatherResponse;
  addToFavorites: () => void;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ data, addToFavorites }) => {
  if (!data) {
    return <div>No weather data available.</div>;
  }

  const { current, hourly } = data;

  // Get the latest humidity from the hourly data
  const latestHumidity = hourly.relative_humidity_2m[0]; 

  // Convert the time string to a Date object
  const formattedTime = current?.time ? new Date(current.time).toLocaleString() : '';

  return (
    <div>
      <h2>Current Weather</h2>
      <p>Time: {formattedTime}</p>
      <p>Temperature: {current?.temperature_2m} °C</p>
      <p>Wind Speed: {current?.wind_speed_10m} m/s</p>
      <p>Humidity: {latestHumidity} %</p>
      <button onClick={addToFavorites}>Add to Favorites</button>
    </div>
  );
};

export default WeatherDisplay;
