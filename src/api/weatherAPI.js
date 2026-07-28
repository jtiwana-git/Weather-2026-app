// Environment variables for API configuration
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const GEO_URL = import.meta.env.VITE_GEO_URL;

// Fetch current weather by city name
export const getCurrentWeather = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`,
    );

    // Handle API response errors
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(
          `City "${city}" not found. Please check the city spelling and try again.`,
        );
      } else if (response.status === 401) {
        throw new Error(
          `Invalid API key. Please check your API key configuration.`,
        );
      } else {
        throw new Error(
          `Failed to fetch current weather data, please try again later.`,
        );
      }
    }
    const data = await response.json();

    // Ensure we have the current timestamp if not provided
    if (!data.dt) {
      data.dt = Math.floor(Date.now() / 1000);
    }
    return data;
  } catch (error) {
    // Handle network errors
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        "Network error: Unable to reach the weather service. Please check your internet connection.",
        { cause: error },
      );
    }
    throw error;
  }
};

// Fetch current weather by latitude and longitude coordinates
export const getCurrentWeatherByCoords = async (lat, lon) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
    );

    // Handle API response errors
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(
          `Invalid API key. Please check your API key configuration.`,
        );
      } else {
        throw new Error(
          `Failed to fetch current weather data, please try again later.`,
        );
      }
    }
    const data = await response.json();

    // Ensure we have the current timestamp if not provided
    if (!data.dt) {
      data.dt = Math.floor(Date.now() / 1000);
    }
    return data;
  } catch (error) {
    // Handle network errors
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        "Network error: Unable to reach the weather service. Please check your internet connection.",
        { cause: error },
      );
    }
    throw error;
  }
};

// Fetch weather forecast by city name
export const getCurrentWeatherByForecast = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`,
    );

    // Handle API response errors
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(
          `City "${city}" not found. Please check the city spelling and try again.`,
        );
      } else if (response.status === 401) {
        throw new Error(
          `Invalid API key. Please check your API key configuration.`,
        );
      } else {
        throw new Error(
          `Failed to fetch current weather data, please try again later.`,
        );
      }
    }
    return await response.json();
  } catch (error) {
    // Handle network errors
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        "Network error: Unable to reach the weather service. Please check your internet connection.",
        { cause: error },
      );
    }
    throw error;
  }
};

// Search for cities by query and return formatted results
export const searchCities = async (query) => {
  try {
    const response = await fetch(
      `${GEO_URL}/direct?q=${query}&limit=5&appid=${API_KEY}`,
    );

    // Handle API response errors
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(
          `Invalid API key. Please check your API key configuration.`,
        );
      } else {
        throw new Error(`Failed to fetch city data, please try again later.`);
      }
    }

    const data = await response.json();
    // Transform the geo data to match the expected format
    return data.map((city) => ({
      name: city.name,
      lat: city.lat,
      lon: city.lon,
      country: city.country,
      state: city.state || "",
    }));
  } catch (error) {
    // Handle network errors
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        "Network error: Unable to reach the weather service. Please check your internet connection.",
        { cause: error },
      );
    }
    throw error;
  }
};
