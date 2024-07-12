"use client";
import { useState, useEffect } from "react";
export default function InputField() {
  const options = ["ETH", "DAI", "USDC"];
  const [sellSelected, setSellSelected] = useState(options[0]);
  const [buySelected, setBuySelected] = useState(""); // Initialize to empty string

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md p-4 dark:bg-gray-800">
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
        Swap anything, anywhere
      </h2>
      <div className="space-y-4">
        <div className="w-full flex items-center border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 justify-between p-4">
          <div className="flex items-center">
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mr-2">
              Sells
            </label>
            <input
              type="number"
              defaultValue="0"
              className="flex-1  max-w-24 text-xl border bg-transparent border-none  dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <select
            value={sellSelected}
            onChange={(e) => setSellSelected(e.target.value)}
            className="ml-2 p-2 text-xl border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full flex items-center border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 p-4 justify-between">
          <div className="flex items-center">
            <label className="block text-lg font-medium text-gray-700  dark:text-gray-300 mr-2">
              Buy
            </label>
            <input
              type="number"
              defaultValue="0"
              className="flex-1  max-w-24 text-xl border bg-transparent border-none  dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <select
            value={buySelected}
            onChange={(e) => setBuySelected(e.target.value)}
            className="ml-2 p-2 text-xl border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Select token</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <button className="w-full p-4 mt-6 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600">
          Connect wallet
        </button>
      </div>
    </div>
  );
}
