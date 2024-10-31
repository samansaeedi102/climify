// Define the base URL for the OpenCage Geocoding API
const BASE_URL = 'https://api.opencagedata.com/geocode/v1/json';

// Fetch coordinates for a given city
export const fetchCoordinates = async (city: string): Promise<[number, number]> => {
    // The API key for OpenCage to convert a city name into coordinates
    const apiKey = '1b4b0e104c6545fb9f44d080044c29f8'; 
    const response = await fetch(`${BASE_URL}?q=${encodeURIComponent(city)}&key=${apiKey}`);

    if (!response.ok) {
        throw new Error("Failed to fetch coordinates");
    }

    const data = await response.json();
    if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        return [lat, lng];
    } else {
        throw new Error("City not found");
    }
};
