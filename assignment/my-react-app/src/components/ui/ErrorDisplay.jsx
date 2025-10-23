import { Card, CardContent } from './card';
export const ErrorDisplay = ({ error }) => {
  if (!error) return null;

  return (
    <div className="w-full max-w-2xl mx-auto bg-red-50 border border-red-200 rounded-lg p-6">
      <div className="flex items-center gap-4 text-red-800">
        <div className="flex-shrink-0">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p className="font-semibold">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    </div>
  );
};
