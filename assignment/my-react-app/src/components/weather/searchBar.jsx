import { useState } from 'react'

export const SearchBar = ({ onSearch, loading }) => {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim()) {
      onSearch(inputValue.trim())
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto mb-8 p-6 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="flex gap-4 items-end">
        <div className="flex-1 space-y-2">
          <label htmlFor="city" className="text-sm font-medium text-gray-700">
            Enter City Name
          </label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="e.g., London, New York, Tokyo..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            disabled={loading}
          />
        </div>
        <button 
          type="submit" 
          disabled={loading || !inputValue.trim()}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 font-medium text-lg"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
    </div>
  )
}