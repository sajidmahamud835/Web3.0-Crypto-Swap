import InputField from "./InputField";

export default function ThirdSection() {
  return (
    <div className="bg-gray-100 py-12 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-12 items-center">
          {/* Left Column */}
          <div className="md:col-span-2">
            <p className="text-blue-500 dark:text-blue-400 text-xl font-bold mb-8">
              Why CryptoSwap?
            </p>
            <h1 className="text-4xl md:text-4xl font-bold text-gray-800 dark:text-blue-200 mb-8">
              We Offer You Best rate, Faster and Safe Transactions{" "}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Process trades at a time convenient for you. No need to create any
              ad or do any P2P chat. Our service is fully automated and safer.
            </p>
            <button
              type="button"
              class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-lg px-8 py-3 text-center me-2 mb-2 "
            >
              Start Trading
            </button>
            <button
              type="button"
              class="text-gray-900 text-lg px-5 py-2.5 me-2 mb-2 hover:text-blue-500 "
            >
              Read more {"->"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
