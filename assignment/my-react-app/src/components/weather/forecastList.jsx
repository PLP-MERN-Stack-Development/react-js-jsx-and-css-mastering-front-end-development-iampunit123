import { getWeatherIcon, formatTemperature } from '../../utils/helpers'

export const ForecastList = ({ forecast }) => {
  if (!forecast) return null

  const dailyForecast = forecast.list.filter((item, index) => index % 8 === 0).slice(0, 5)

  return (
    <div className="w-full max-w-2xl mx-auto mt-6 bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">5-Day Forecast</h3>
      <div className="space-y-4">
        {dailyForecast.map((day) => (
          <div key={day.dt} className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
            <div className="flex items-center gap-4 flex-1">
              <p className="font-semibold text-gray-800 min-w-[100px]">
                {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' })}
              </p>
              <img 
                src={getWeatherIcon(day.weather[0].icon)} 
                alt={day.weather[0].description}
                className="w-12 h-12"
              />
              <div className="text-left">
                <p className="font-semibold text-lg text-gray-800">
                  {formatTemperature(day.main.temp)}
                </p>
                <p className="text-sm text-gray-600 capitalize">
                  {day.weather[0].description}
                </p>
              </div>
            </div>
            <div className="text-right text-sm text-gray-500">
              <p>H: {formatTemperature(day.main.temp_max)}</p>
              <p>L: {formatTemperature(day.main.temp_min)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}