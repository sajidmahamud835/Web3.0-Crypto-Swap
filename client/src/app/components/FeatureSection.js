export default function FeatureSection() {
  return (
    <div className="bg-gray-100 py-12 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Section 1 */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 dark:bg-gray-800">
            <h3 className="text-xl font-bold text-blue-500 dark:text-blue-200 mb-2">
              Exchange cryptocurrencies
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Easily swap between popular blockchain cryptocurrencies like USDT,
              ETH, BTC, and more. Enjoy secure and fast transactions with no
              fiat conversions.
            </p>
          </div>

          {/* Section 2 */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 dark:bg-gray-800">
            <h3 className="text-xl font-bold text-blue-500 dark:text-blue-200 mb-2">
              Get additional profit
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              CryptoSwap offers up to 5% less fees for each successful trade.
              Minimize your cost with our automated platform.
            </p>
          </div>

          {/* Section 3 */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 dark:bg-gray-800">
            <h3 className="text-xl font-bold text-blue-500 dark:text-blue-200 mb-2">
              Simple & Fast
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Connect your web3 wallet and start using the platform instantly.
              We support MetaMask, Trust Wallet, Coinbase Wallet and all popular
              hardware and software wallets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
