import React from 'react';

export default function FollowUs() {
  return (
    <div className="min-h-[300px] flex flex-col justify-center items-center bg-gray-100 py-12 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          Follow <span className="text-blue-500">@CryptoSwap</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Our team publishes news and much more in the Telegram channel.
        </p>

        <button
          type="button"
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:to-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-lg px-8 py-3 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Go to @CryptoSwap
        </button>
      </div>
    </div>
  );
}
