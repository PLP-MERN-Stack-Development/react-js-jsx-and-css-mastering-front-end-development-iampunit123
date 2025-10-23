export const Button = ({ 
  children, 
  variant = 'primary', 
  loading = false,
  className = '',
  ...props 
}) => {
  const baseClasses = "px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 shadow hover:shadow-lg",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400",
    danger: "bg-red-500 text-white hover:bg-red-600 active:bg-red-700"
  }
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${className}`}
      disabled={loading}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  )
}