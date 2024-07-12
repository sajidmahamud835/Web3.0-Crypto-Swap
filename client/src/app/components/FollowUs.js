export default function FollowUs() {
  return (
    <div className="min-h-[300px] flex flex-col justify-center items-center bg-gray-100 py-12 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          Follow <span className="text-blue-500">@CryptoSwap</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Our team publishes news and much more in the Telegram channel.
        </p>

        <button
          type="button"
          class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-lg px-8 py-3 text-center me-2 mb-2 "
        >
          Go to @CryptoSwap
        </button>
      </div>
    </div>
  );
}
