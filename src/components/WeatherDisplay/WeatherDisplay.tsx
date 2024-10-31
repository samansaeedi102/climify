// src/components/WeatherDisplay/WeatherDisplay.tsx
import React from 'react';
import styled from 'styled-components';
import { WeatherResponse } from '../../models/WeatherData';

interface WeatherDisplayProps {
  data: WeatherResponse;
  addToFavorites: () => void;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ data, addToFavorites }) => {
  if (!data) {
    return <Container>No weather data available.</Container>;
  }

  const { current, hourly } = data;
  const latestHumidity = hourly.relative_humidity_2m[0];

  return (
    <Container>
      <Title>Current Weather</Title>
      <WeatherInfo>Time: {new Date(current?.time).toLocaleString()}</WeatherInfo>
      <WeatherInfo>Temperature: {current?.temperature_2m} °C</WeatherInfo>
      <WeatherInfo>Wind Speed: {current?.wind_speed_10m} m/s</WeatherInfo>
      <WeatherInfo>Humidity: {latestHumidity} %</WeatherInfo>
      <Button onClick={addToFavorites}>Add to Favorites</Button>
    </Container>
  );
};

export default WeatherDisplay;

// Styled Components
const Container = styled.div`
  padding: 16px;
  border-radius: 8px;
  background-color: #f0f8CC;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
`;

const WeatherInfo = styled.p`
  font-size: 18px;
  color: #555;
  margin: 4px 0;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
