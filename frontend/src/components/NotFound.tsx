import { useNavigate } from 'react-router-dom';
import { Home, AlertCircle, ArrowLeft } from 'lucide-react';

interface Props {
  props?:string
}

export function NotFound(props:Props) {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      {/* Icon Area */}
      <div className="bg-red-50 p-6 rounded-full mb-6">
        <AlertCircle className="w-16 h-16 text-red-500" />
      </div>

      {/* Text Content */}
      <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 max-w-md mb-8">
        Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>

        <button
          onClick={() => navigate('/')}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-shadow shadow-md hover:shadow-lg font-medium"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </button>
      </div>
    </div>
  );
}