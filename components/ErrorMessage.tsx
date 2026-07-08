interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] p-8 text-center">
      <div className="bg-red-100 dark:bg-red-900/20 rounded-full p-8 mb-6">
        <span className="text-7xl">😅</span>
      </div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
        Oops! Something went wrong
      </h2>
      <p className="text-gray-600 dark:text-gray-300 max-w-md mb-8 text-lg">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl font-medium"
        >
          Try Again
        </button>
      )}
    </div>
  );
}