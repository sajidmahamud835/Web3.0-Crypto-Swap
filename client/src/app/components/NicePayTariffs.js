export default function NicePayTariffs() {
  return (
    <div className="bg-gray-100 py-12 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto space-y-12">
        {/* First Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="md:w-2/3 mb-8 md:mb-0">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-blue-200 mb-4">
              CryptoSwap Tariffs
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              All platform tariffs are as transparent as possible, without
              hidden fees.
            </p>
          </div>
          <div>
            <button
              type="button"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-lg px-8 py-3 text-center me-2 mb-2 "
            >
              Go to tariffs
            </button>
          </div>
        </div>

        {/* Second Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 dark:bg-gray-800">
            <h3 className="text-xl font-bold text-gray-800 dark:text-blue-200 mb-8">
              P2P Trading Merchants
            </h3>
            <div className="mb-8">
              <h4 className="text-blue-500 font-bold mb-2">No commission</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Deposit, withdrawal and trades
              </p>
            </div>
            <div className="mb-8">
              <h4 className="text-blue-500 font-bold mb-2">
                Up to 50 USDT per trade
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Additional profit from each trade
              </p>
            </div>
            <p className="text-gray-400 mt-8">
              When withdrawing funds to the network, a network fee may be
              charged.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 dark:bg-gray-800">
            <h3 className="text-xl font-bold text-gray-800 dark:text-blue-200 mb-8">
              Merchants Merchants
            </h3>
            <div className="mb-8">
              <h4 className="text-blue-500 font-bold mb-2">
                from 7% per trade
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Accepting payments
              </p>
            </div>
            <div className="mb-8">
              <h4 className="text-blue-500 font-bold mb-2">No commission</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Withdrawal of funds from the merchant
              </p>
            </div>
            <p className="text-gray-400 mt-8">
              When withdrawing funds to the network, a network fee may be
              charged.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
