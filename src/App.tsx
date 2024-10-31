// src/App.tsx
import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import WeatherDisplay from './components/WeatherDisplay/WeatherDisplay';
import FavoritesList from './components/FavoritesList/FavoritesList';
import { fetchWeather } from './services/WeatherService';
import { fetchCoordinates } from './services/GeocodingService';
import { WeatherResponse } from './models/WeatherData';
import { styled } from 'styled-components';
import { mediaRules } from './themes/media-breakpoints';

interface FavoriteCity {
  name: string;
  temperature: number; 
}

const App: React.FC = () => {
  const [city, setCity] = useState<string>('');  
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);  
  const [favorites, setFavorites] = useState<FavoriteCity[]>([]);  
  const [error, setError] = useState<string | null>(null);  

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  const handleSearch = async () => {
    // Reset error state on new search
    setError(null); 
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
        setError(errorMessage); 
        console.error("Error:", error);
        setWeatherData(null); 
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
    <SectionContainer>
    <MainContainer>
      <SectionHeader>
        Climify
      </SectionHeader>
      <SearchBar city={city} setCity={setCity} handleSearch={handleSearch} />
      {error && <ErrorMessage style={{ color: 'red' }}>{error}</ErrorMessage>} 
      {weatherData && <WeatherDisplay data={weatherData} addToFavorites={addToFavorites} />}
      <FavoritesList favorites={sortedFavorites} removeFromFavorites={removeFromFavorites} />
    </MainContainer>
    </SectionContainer>
  );
};

export default App;


export const SectionContainer = styled.section`
  padding: 20px;
  background-color: #f0f8ff;
  height: 100vh;
`;

export const SectionHeader = styled.h1`
  padding-left: 1rem;
  padding-right: 1rem;
  text-align: center;
  margin: auto;
  margin-bottom: 1rem;
  font-size: 4rem;
  font-weight: 600;
  color: #2c3e50;
  text-transform: uppercase;
`;


export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #f0f8CC;
  padding: 2rem;
  ${mediaRules.sm} {
    max-width: 720px;
  }
  ${mediaRules.md} {
    max-width: 940px;
  }

  ${mediaRules.lg} {
    max-width: 1170px;
  }
`;

export const ErrorMessage = styled.p`
  color: red; 
  font-weight: bold; 
  text-align: center;
  margin: 1rem 0; 
`;