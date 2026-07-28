// Maps weather condition to descriptive text and emoji icon
export const getWeatherIcon = (weather) => {
  // Object mapping weather condition names to display strings with emojis
  const iconMap = {
    Clear: "Sun ☀️",
    Clouds: "Cloud ☁️",
    Rain: "Rain 🌧️",
    Drizzle: "Drizzle 🌦️",
    Thunderstorm: "Thunderstorm ⛈️",
    Snow: "Snow ❄️",
    Mist: "Mist 🌫️",
    fog: "Fog 🌁",
    Haze: "Haze 🌫️",
    Dust: "Dust 🌪️",
    Sand: "Sand 🌪️",
    Ash: "Ash 🌋",
    Squall: "Squall 🌬️",
    Tornado: "Tornado 🌪️",
  };

  // Returns the icon for the weather main type, or a default weather emoji if not found
  return iconMap[weather.main] || "Weather 🌈";
};

// Converts temperature between Celsius and Fahrenheit
export const formatTemperature = (temp, unit) => {
  // If unit is Fahrenheit, convert from Celsius using formula: (C * 9/5) + 32
  if (unit === "F") {
    return Math.round((temp * 9) / 5 + 32);
  }
  // Otherwise return temperature in Celsius (rounded to nearest integer)
  return Math.round(temp);
};

// Formats Unix timestamp into readable time string (HH:MM format)
export const formatTime = (timestamp) => {
  // Multiply timestamp by 1000 to convert seconds to milliseconds for Date constructor
  // Then format using en-US locale with 2-digit hour and minute
  return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Formats Unix timestamp into readable date string (Day, Date Month format)
export const formatDate = (timestamp) => {
  // Multiply timestamp by 1000 to convert seconds to milliseconds
  // Format using en-UK locale to show weekday, day number, and month abbreviation
  return new Date(timestamp * 1000).toLocaleDateString("en-UK", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
};

// Converts wind direction degrees (0-360) to cardinal direction abbreviation
export const getWindDirection = (deg) => {
  // Array of 16 cardinal/intercardinal directions in clockwise order
  const directions = [
    "N", // North (0°)
    "NNE", // North-Northeast (22.5°)
    "NE", // Northeast (45°)
    "ENE", // East-Northeast (67.5°)
    "E", // East (90°)
    "ESE", // East-Southeast (112.5°)
    "SE", // Southeast (135°)
    "SSE", // South-Southeast (157.5°)
    "S", // South (180°)
    "SSW", // South-Southwest (202.5°)
    "SW", // Southwest (225°)
    "WSW", // West-Southwest (247.5°)
    "W", // West (270°)
    "WNW", // West-Northwest (292.5°)
    "NW", // Northwest (315°)
    "NNW", // North-Northwest (337.5°)
  ];
  // Divide degrees by 22.5 to map to array index, use modulo 16 to keep within array bounds
  return directions[Math.round(deg / 22.5) % 16];
};
