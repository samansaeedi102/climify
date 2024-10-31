// src/App.tsx
import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import WeatherDisplay from './components/WeatherDisplay/WeatherDisplay';
import FavoritesList from './components/FavoritesList/FavoritesList';
import { fetchWeather } from './services/WeatherService';
import { fetchCoordinates } from './services/GeocodingService';
import { WeatherResponse } from './models/WeatherData';

interface FavoriteCity {
  name: string;
  temperature: number; // Add temperature field
}

const App: React.FC = () => {
  const [city, setCity] = useState<string>('');  
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);  
  const [favorites, setFavorites] = useState<FavoriteCity[]>([]);  // Update to store FavoriteCity

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  const handleSearch = async () => {
    if (city) {
      try {
        const [latitude, longitude] = await fetchCoordinates(city);
        const data = await fetchWeather(latitude, longitude);
        setWeatherData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const addToFavorites = () => {
    if (weatherData) {
      const newFavorite: FavoriteCity = { 
        name: city, 
        temperature: weatherData.current.temperature_2m // Store temperature
      };

      if (!favorites.some(fav => fav.name === newFavorite.name)) {
        const newFavorites = [...favorites, newFavorite];
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
      }
    }
  };

  const removeFromFavorites = (cityToRemove: string) => {
    const newFavorites = favorites.filter(favorite => favorite.name !== cityToRemove);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  // Sort favorites by temperature
  const sortedFavorites = favorites.sort((a, b) => a.temperature - b.temperature);

  return (
    <div>
      <h1>Climify</h1>
      <SearchBar city={city} setCity={setCity} handleSearch={handleSearch} />
      {weatherData && <WeatherDisplay data={weatherData} addToFavorites={addToFavorites} />}
      <FavoritesList favorites={sortedFavorites} removeFromFavorites={removeFromFavorites} />
    </div>
  );
};

export default App;
