import { getWeatherIcon, formatTemperature } from '../../utils/helpers'

export const WeatherCard = ({ weather }) => {
  if (!weather) return null

  const weatherDetails = [
    {
      icon: '🌡️',
      label: 'Feels Like',
      value: formatTemperature(weather.main.feels_like)
    },
    {
      icon: '💧',
      label: 'Humidity',
      value: `${weather.main.humidity}%`
    },
    {
      icon: '💨',
      label: 'Wind Speed',
      value: `${weather.wind.speed} m/s`
    },
    {
      icon: '📊',
      label: 'Pressure',
      value: `${weather.main.pressure} hPa`
    }
  ]

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="text-center pb-4 border-b">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          {weather.name}, {weather.sys.country}
        </h2>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-6">
          <div className="flex items-center gap-4">
            <img 
              src={getWeatherIcon(weather.weather[0].icon)} 
              alt={weather.weather[0].description}
              className="w-20 h-20 md:w-24 md:h-24"
            />
            <div className="text-left">
              <div className="text-3xl md:text-4xl font-bold text-gray-800">
                {formatTemperature(weather.main.temp)}
              </div>
              <p className="text-lg text-gray-600 capitalize">
                {weather.weather[0].description}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t">
          {weatherDetails.map((detail, index) => (
            <div key={index} className="text-center space-y-2">
              <span className="text-2xl">{detail.icon}</span>
              <p className="text-sm text-gray-500">{detail.label}</p>
              <p className="font-semibold text-gray-800">{detail.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}