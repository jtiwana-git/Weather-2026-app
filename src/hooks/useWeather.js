// Import React hooks for managing state and side effects
import { useEffect, useState } from "react";
// Import weather API functions for fetching data
import {
  getCurrentWeather,
  getCurrentWeatherByCoords,
  getCurrentWeatherByForecast,
} from "../api/weatherApi";

// Custom hook to manage weather-related state and API calls
export const useWeather = () => {
  // State to store current weather data
  const [currentWeather, setCurrentWeather] = useState(null);
  // State to store weather forecast data
  const [forecast, setForecast] = useState(null);
  // State to track loading status during API calls
  const [loading, setLoading] = useState(false);
  // State to store error messages if requests fail
  const [error, setError] = useState(null);
  // State to track temperature unit (Celsius or Fahrenheit)
  const [unit, setUnit] = useState("C");

  // Async function to fetch weather data by city name
  const fetchWeatherByCity = async (city) => {
    // Set loading to true to indicate data is being fetched
    setLoading(true);
    // Clear any previous errors
    setError(null);
    try {
      // Fetch both current weather and forecast data in parallel
      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(city),
        getCurrentWeatherByForecast(city),
      ]);
      // Update current weather state with fetched data
      setCurrentWeather(weatherData);
      // Update forecast state with fetched data
      setForecast(forecastData);
    } catch (error) {
      // Set error message if the request fails
      setError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.",
      );
    } finally {
      // Set loading to false after request completes (success or failure)
      setLoading(false);
    }
  };

  // Async function to fetch weather data using browser's geolocation API
  const fetchWeatherByLocation = async (lat, lon) => {
    // Check if browser supports geolocation
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
    }
    // Set loading to true to indicate data is being fetched
    setLoading(true);
    // Clear any previous errors
    setError(null);

    // Request user's current position from browser
    navigator.geolocation.getCurrentPosition(
      // Success callback - runs when geolocation is obtained
      async (position) => {
        try {
          // Extract latitude and longitude from position object
          const { latitude, longitude } = position.coords;
          // Fetch weather data using coordinates
          const weatherData = await getCurrentWeatherByCoords(
            latitude,
            longitude,
          );
          // Update current weather state with fetched data
          setCurrentWeather(weatherData);

          // Fetch forecast data based on the city name from weather data
          const forecastData = await getCurrentWeatherByForecast(
            weatherData.name, // Use the city name from the current weather data
          );
          // Update forecast state with fetched data
          setForecast(forecastData);
        } catch (error) {
          // Set error message if the request fails
          setError(
            error instanceof Error
              ? error.message
              : "An unexpected error occurred - cannot get weather data.",
          );
        } finally {
          // Set loading to false after request completes (success or failure)
          setLoading(false);
        }
      },
      // Error callback - runs when geolocation request fails or is denied
      (error) => {
        // Set error message if location access is denied or unavailable
        setError(
          "Unable to retrieve your location. Please allow location access and try again.",
        );
        // Set loading to false since request failed
        setLoading(false);
      },
    );
  };

  // Function to toggle temperature unit between Celsius and Fahrenheit
  const toggleUnit = () => {
    setUnit(unit === "C" ? "F" : "C");
  };

  // Hook that runs on component mount to load default weather data
  useEffect(() => {
    // Fetch weather data for New York on initial load
    fetchWeatherByCity("New York");
  }, []);

  // Return all state and functions for use in components
  return {
    currentWeather,
    forecast,
    loading,
    error,
    fetchWeatherByCity,
    fetchWeatherByLocation,
    unit,
    toggleUnit,
  };
};
