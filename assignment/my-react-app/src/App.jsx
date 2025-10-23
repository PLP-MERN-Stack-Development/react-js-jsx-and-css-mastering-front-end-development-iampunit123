import { useWeather } from './hooks/useWeather'
import { SearchBar } from './components/weather/searchBar'
import { WeatherCard } from './components/weather/weatherCard'
import { ForecastList } from './components/weather/forecastList'
import { LoadingSpinner } from './components/ui/loadingSpinner'
import { ErrorDisplay } from './components/ui/ErrorDisplay';


function App() {
  const { weather, forecast, loading, error, searchWeather } = useWeather()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Weather Dashboard
          </h1>
          <p className="text-blue-100 text-lg md:text-xl">
            Get real-time weather information for any city worldwide
          </p>
        </header>

        {/* Search & Weather Content */}
        <div className="space-y-6">
          <SearchBar onSearch={searchWeather} loading={loading} />
          <ErrorDisplay error={error} />
          {loading && <LoadingSpinner />}
          {weather && !loading && (
            <div className="space-y-6">
              <WeatherCard weather={weather} />
              <ForecastList forecast={forecast} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App