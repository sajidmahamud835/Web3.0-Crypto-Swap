import InputField from "./InputField";

export default function HeroSection() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-12 items-center">
          {/* Left Column */}
          <div className="md:col-span-2">
            <p className="text-orange-600 rounded-lg py-2 px-4 mb-8">
              <span className="border-2 border-orange-600 rounded-lg py-1 px-2">
                Low Commission, High Speed and Automated!
              </span>
            </p>
            <h1 className="text-4xl dark:text-blue-200 md:text-6xl font-bold text-gray-800 mb-8">
              CryptoSwap: Automated Crypto Trading Platform
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Process trades at the market rate, get additional profit and
              withdraw it on the same day. Or even accept payment on the site
              with minimal fees and no limits.
            </p>
            <button
              type="button"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-lg px-8 py-3 text-center me-2 mb-2 "
            >
              Start Trading
            </button>
            <button
              type="button"
              className="text-gray-900 dark:text-gray-200 text-lg px-5 py-2.5 me-2 mb-2 hover:text-blue-500 dark:hover:text-blue-200 "
            >
              Accept payments {"->"}
            </button>
          </div>

          {/* Right Column (Card Component will go here) */}
          <div className="md:col-span-1">
            {/* Card Component */}
            {/* Replace this with your Card component */}
            <div className="w-full">
              {/* Your Card content goes here */}
              {/* Example: */}
              {/* <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Card Title
              </h2>
              <p className="text-gray-600">Card content goes here...</p> */}
              <InputField />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
