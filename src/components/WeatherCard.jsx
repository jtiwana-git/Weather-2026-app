// ============================================
// IMPORTS: Icons and utility functions
// ============================================
import {
  MapPin,
  Sunrise,
  Eye,
  Wind,
  Droplets,
  Gauge,
  Sunset,
  Thermometer,
} from "lucide-react";
import {
  getWeatherIcon,
  formatTemperature,
  formatTime,
} from "../utils/index.js";
import * as LucideIcons from "lucide-react";

// ============================================
// WEATHER CARD COMPONENT
// ============================================
const WeatherCard = ({ weather, unit }) => {
  // ----------------------------------------
  // SECTION 1: Initialize weather icon
  // ----------------------------------------
  const iconName = getWeatherIcon(weather.weather[0].icon);
  const IconComponent = LucideIcons[iconName] || LucideIcons.Cloud;

  // ----------------------------------------
  // SECTION 2: Weather status data array
  // ----------------------------------------
  const WeatherStatus = [
    {
      icon: Eye,
      label: "Visibility",
      value: `${(weather.visibility / 1000).toFixed(1)} km`,
      color: "text-blue-300",
    },
    {
      icon: Wind,
      label: "Wind Speed",
      value: `${weather.wind.speed.toFixed(1)} m/s`,
      color: "text-green-300",
    },
    {
      icon: Droplets,
      label: "Humidity",
      value: `${weather.main.humidity}%`,
      color: "text-cyan-300",
    },
    {
      icon: Gauge,
      label: "Pressure",
      value: `${weather.main.pressure} hPa`,
      color: "text-purple-300",
    },
    {
      icon: Thermometer,
      label: "Feels Like",
      value: `${formatTemperature(weather.main.feels_like, unit)}°${unit}`,
      color: "text-orange-300",
    },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:bg-white/15 transition-all duration-500">
      {/* ========================================
          SECTION 3: Header with location and time
          ======================================== */}
      <div className="flex items-center justify-between mb-8">
        {/* Location info */}
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/10 rounded-full">
            <MapPin className="w-5 h-5 text-white/80" />
          </div>
          <div>
            <h2 className=" text-white font-semibold text-lg">
              {weather.name}
            </h2>
            <p className="text-white/60 text-sm">{weather.sys.country}</p>
          </div>
        </div>

        {/* Date and time display */}
        <div className="text-right">
          <div className="text-white/70 text-sm">
            {new Date(weather.dt * 1000).toLocaleDateString("en-UK", {
              weekday: "long",
              day: "numeric",
              month: "short",
            })}
          </div>
          <div className="text-white/50 text-sm">
            {new Date(weather.dt * 1000).toLocaleTimeString("en-UK", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>

      {/* ========================================
          SECTION 4: Main weather display
          ======================================== */}
      <div className="flex items-center justify-between mb-10">
        {/* Temperature and description */}
        <div className="flex-1">
          <div className="text-7xl font-bold text-white mb-3 tracking-tight">
            {formatTemperature(weather.main.temp, unit)}°
            <span className="text-4xl font-normal text-white/70">{unit}</span>
          </div>
          <div className="text-white/90 text-xl capitalize font-medium">
            {weather.weather[0].description}
          </div>
          <div className="flex items-center space-x-4 text-white/60 text-sm">
            <span>
              L: {formatTemperature(weather.main.temp_min, unit)}°{unit}
            </span>
            <span>
              H: {formatTemperature(weather.main.temp_max, unit)}°{unit}
            </span>
          </div>
        </div>

        {/* Weather icon */}
        <div className="text-white/90 transform hover:scale-110 transition-transform duration-300">
          <IconComponent size={20} className="drop-shadow-2xl" />
        </div>
      </div>

      {/* ========================================
          SECTION 5: Weather statistics grid
          ======================================== */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {WeatherStatus.map((item, index) => (
          <div
            key={index}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/10 transition-all duration-300 group"
          >
            {/* Icon and label */}
            <div className="flex items-center space-x-3 mb-2">
              <div
                className={`p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-all`}
              >
                <item.icon className="w-4 h-4 text-white/70" />
              </div>
              <span className="text-white/70 text-sm font-medium">
                {item.label}
              </span>
            </div>

            {/* Weather value */}
            <div className={`font-semibold text-lg pl-11 ${item.color}`}>
              {item.value}
            </div>
          </div>
        ))}
      </div>

      {/* ========================================
          SECTION 6: Sunrise and Sunset times
          ======================================== */}
      <div className="grid grid-cols-2 gap-4">
        {/* Sunrise card */}
        <div className="bg-linear-to-r from-orange-500/20 to-yellow-500/20 backdrop-blur-sm rounded-2xl p-4 border border-orange-400/20">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-orange-400/20 rounded-full">
              <Sunrise className="w-4 h-4 text-orange-300" />
            </div>
            <span className="text-white/80 text-sm font-medium">Sunrise</span>
          </div>
          <div className="text-white font-semibold text-lg pl-11">
            {formatTime(weather.sys.sunrise, weather.timezone)}
          </div>
        </div>

        {/* Sunset card */}
        <div className="bg-linear-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-4 border border-purple-400/20">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-purple-400/20 rounded-full">
              <Sunset className="w-4 h-4 text-purple-300" />
            </div>
            <span className="text-white/80 text-sm font-medium">Sunset</span>
          </div>
          <div className="text-white font-semibold text-lg pl-11">
            {formatTime(weather.sys.sunset, weather.timezone)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
