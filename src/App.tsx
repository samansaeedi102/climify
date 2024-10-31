import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import WeatherDisplay from './components/WeatherDisplay/WeatherDisplay';
import FavoritesList from './components/FavoritesList/FavoritesList';
import { fetchWeather } from './services/WeatherService';
import { fetchCoordinates } from './services/GeocodingService';
import { WeatherResponse } from './models/WeatherData';

const App: React.FC = () => {
  const [city, setCity] = useState<string>('');  // State for city name
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);  // Weather data state
  const [favorites, setFavorites] = useState<string[]>([]);  // Favorites state
  const [error, setError] = useState<string | null>(null);  // Error state

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  // Function to handle search
  const handleSearch = async () => {
    setError(null); // Reset error state on new search
    if (city) {
      try {
        // Fetch coordinates using the entered city name
        const [latitude, longitude] = await fetchCoordinates(city);
        if (!latitude || !longitude) {
          throw new Error('City not found');
        }
        // Now fetch the weather data using the obtained coordinates
        const data = await fetchWeather(latitude, longitude);
        setWeatherData(data);
      } catch (error) {
        // Type assertion to Error
        const errorMessage = (error as Error).message || 'An error occurred';
        setError(errorMessage); // Set error message for UI
        setWeatherData(null); // Clear previous weather data on error
      }
    }
  };

  // Function to add the city to favorites
  const addToFavorites = () => {
    if (weatherData && !favorites.includes(city)) {
      const newFavorites = [...favorites, city];
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }
  };

  // Function to remove a city from favorites
  const removeFromFavorites = (cityToRemove: string) => {
    const newFavorites = favorites.filter(favorite => favorite !== cityToRemove);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return (
    <div>
      <h1>Climify</h1>
      <SearchBar city={city} setCity={setCity} handleSearch={handleSearch} />
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      {weatherData && <WeatherDisplay data={weatherData} addToFavorites={addToFavorites} />}
      <FavoritesList favorites={favorites} removeFromFavorites={removeFromFavorites} />
    </div>
  );
};

export default App;
