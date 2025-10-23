import { useState, useEffect } from 'react'
import { fetchCurrentWeather, fetchForecast } from '../api/weatherApi'

export const useWeather = () => {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [city, setCity] = useState('')

  const searchWeather = async (cityName) => {
    if (!cityName.trim()) return
    
    setLoading(true)
    setError(null)
    
    try {
      const [currentData, forecastData] = await Promise.all([
        fetchCurrentWeather(cityName),
        fetchForecast(cityName)
      ])
      
      setWeather(currentData)
      setForecast(forecastData)
      setCity(cityName)
    } catch (err) {
      setError(err.message)
      setWeather(null)
      setForecast(null)
    } finally {
      setLoading(false)
    }
  }

  // Load weather for London when app starts
  useEffect(() => {
    searchWeather('London')
  }, [])

  return {
    weather,
    forecast,
    loading,
    error,
    city,
    searchWeather
  }
}