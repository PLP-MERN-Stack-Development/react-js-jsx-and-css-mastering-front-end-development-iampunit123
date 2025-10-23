import { Card, CardContent } from '../ui/card'

export const LoadingSpinner = () => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-12">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="text-lg text-gray-600">Loading weather data...</p>
      </div>
    </div>
  )
}