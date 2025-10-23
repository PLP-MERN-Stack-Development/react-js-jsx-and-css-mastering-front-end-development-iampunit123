const BASE_URL = 'https://api.open-meteo.com/v1'



export const fetchCurrentWeather = async (city) => {
  // For simplicity, we'll use fixed coordinates for major cities
  // In a real app, you'd use a geocoding API to convert city name to coordinates
  const cityCoordinates = {
    'london': { lat: 51.5074, lon: -0.1278 },
    'new york': { lat: 40.7128, lon: -74.0060 },
    'tokyo': { lat: 35.6762, lon: 139.6503 },
    'paris': { lat: 48.8566, lon: 2.3522 },
    'sydney': { lat: -33.8688, lon: 151.2093 },
    'berlin': { lat: 52.5200, lon: 13.4050 },
    'mumbai': { lat: 19.0760, lon: 72.8777 },
    'dubai': { lat: 25.2048, lon: 55.2708 },
    'singapore': { lat: 1.3521, lon: 103.8198 },
    'toronto': { lat: 43.6532, lon: -79.3832 }
  }

  const cityName = city.toLowerCase().trim()
  const coordinates = cityCoordinates[cityName]

  if (!coordinates) {
    throw new Error(`City "${city}" not found in our database. Try: London, New York, Tokyo, Paris, Sydney, Berlin, Mumbai, Dubai, Singapore, or Toronto`)
  }

  const response = await fetch(
    `${BASE_URL}/forecast?latitude=${coordinates.lat}&longitude=${coordinates.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,surface_pressure&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
  )
  
  if (!response.ok) {
    throw new Error('Failed to fetch weather data')
  }
  
  const data = await response.json()
  
  // Transform Open-Meteo data to match our app's expected format
  return transformWeatherData(data, city)
}

export const fetchForecast = async (city) => {
  const cityCoordinates = {
    'london': { lat: 51.5074, lon: -0.1278 },
    'new york': { lat: 40.7128, lon: -74.0060 },
    'tokyo': { lat: 35.6762, lon: 139.6503 },
    'paris': { lat: 48.8566, lon: 2.3522 },
    'sydney': { lat: -33.8688, lon: 151.2093 },
    'berlin': { lat: 52.5200, lon: 13.4050 },
    'mumbai': { lat: 19.0760, lon: 72.8777 },
    'dubai': { lat: 25.2048, lon: 55.2708 },
    'singapore': { lat: 1.3521, lon: 103.8198 },
    'toronto': { lat: 43.6532, lon: -79.3832 }
  }

  const cityName = city.toLowerCase().trim()
  const coordinates = cityCoordinates[cityName]

  if (!coordinates) {
    throw new Error(`City "${city}" not found in our database. Try: London, New York, Tokyo, Paris, Sydney, Berlin, Mumbai, Dubai, Singapore, or Toronto`)
  }

  const response = await fetch(
    `${BASE_URL}/forecast?latitude=${coordinates.lat}&longitude=${coordinates.lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min&timezone=auto`
  )
  
  if (!response.ok) {
    throw new Error('Failed to fetch forecast data')
  }
  
  const data = await response.json()
  return transformForecastData(data, city)
}

// Helper function to transform Open-Meteo data to our app's format
function transformWeatherData(data, cityName) {
  const current = data.current
  
  // Map weather codes to descriptions and icons
  const weatherCodeMap = {
    0: { description: 'Clear sky', icon: '01d' },
    1: { description: 'Mainly clear', icon: '01d' },
    2: { description: 'Partly cloudy', icon: '02d' },
    3: { description: 'Overcast', icon: '04d' },
    45: { description: 'Fog', icon: '50d' },
    48: { description: 'Depositing rime fog', icon: '50d' },
    51: { description: 'Light drizzle', icon: '09d' },
    53: { description: 'Moderate drizzle', icon: '09d' },
    55: { description: 'Dense drizzle', icon: '09d' },
    61: { description: 'Slight rain', icon: '10d' },
    63: { description: 'Moderate rain', icon: '10d' },
    65: { description: 'Heavy rain', icon: '10d' },
    80: { description: 'Slight rain showers', icon: '09d' },
    81: { description: 'Moderate rain showers', icon: '09d' },
    82: { description: 'Violent rain showers', icon: '09d' },
    95: { description: 'Thunderstorm', icon: '11d' },
  }
  
  const weatherInfo = weatherCodeMap[data.current.weather_code] || { description: 'Unknown', icon: '01d' }
  
  return {
    name: cityName.charAt(0).toUpperCase() + cityName.slice(1),
    sys: { country: '' }, // Open-Meteo doesn't provide country
    main: {
      temp: current.temperature_2m,
      feels_like: current.apparent_temperature,
      humidity: current.relative_humidity_2m,
      pressure: current.surface_pressure
    },
    weather: [{
      description: weatherInfo.description,
      icon: weatherInfo.icon
    }],
    wind: {
      speed: current.wind_speed_10m
    }
  }
}

function transformForecastData(data, cityName) {
  const daily = data.daily
  
  return {
    city: {
      name: cityName.charAt(0).toUpperCase() + cityName.slice(1)
    },
    list: daily.time.map((time, index) => ({
      dt: new Date(time).getTime() / 1000, // Convert to Unix timestamp
      main: {
        temp: daily.temperature_2m_max[index],
        temp_max: daily.temperature_2m_max[index],
        temp_min: daily.temperature_2m_min[index]
      },
      weather: [{
        description: getWeatherDescription(daily.weather_code[index]),
        icon: getWeatherIcon(daily.weather_code[index])
      }]
    }))
  }
}

function getWeatherDescription(code) {
  const codeMap = {
    0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
    45: 'Fog', 48: 'Fog', 51: 'Light drizzle', 53: 'Moderate drizzle',
    55: 'Dense drizzle', 61: 'Slight rain', 63: 'Moderate rain',
    65: 'Heavy rain', 80: 'Slight rain showers', 81: 'Moderate rain showers',
    82: 'Violent rain showers', 95: 'Thunderstorm'
  }
  return codeMap[code] || 'Unknown'
}

function getWeatherIcon(code) {
  const iconMap = {
    0: '01d', 1: '01d', 2: '02d', 3: '04d', 45: '50d', 48: '50d',
    51: '09d', 53: '09d', 55: '09d', 61: '10d', 63: '10d', 65: '10d',
    80: '09d', 81: '09d', 82: '09d', 95: '11d'
  }
  return iconMap[code] || '01d'
}