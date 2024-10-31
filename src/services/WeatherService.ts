import { WeatherResponse } from '../models/WeatherData';

// Define the base URL for the Open Meteo API
const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

// Fetch weather data based on latitude and longitude
export const fetchWeather = async (latitude: number, longitude: number): Promise<WeatherResponse> => {
    const response = await fetch(`${BASE_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`);

    if (!response.ok) {
        throw new Error("Failed to fetch weather data");
    }

    const data: WeatherResponse = await response.json();
    return data;
};
