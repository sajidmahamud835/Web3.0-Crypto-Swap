import axios from 'axios';
import { getCryptos, saveCryptos } from '../models/crypto'; 

const pinnedCryptos = [
  { id: "Ethereum", name: "Ethereum", token: "ETH", icon: "./cryptos/eth.svg", coingeckoId: "ethereum" },
  { id: "Dai Stablecoin", name: "Dai Stablecoin", token: "DAI", icon: "./cryptos/dai.svg", coingeckoId: "dai" },
  { id: "USD Coin", name: "USD Coin", token: "USDC", icon: "./cryptos/usdc.svg", coingeckoId: "usd-coin" },
  { id: "Tether USD", name: "Tether USD", token: "USDT", icon: "./cryptos/usdt.svg", coingeckoId: "tether" },
  { id: "Wrapped BTC", name: "Wrapped BTC", token: "WBTC", icon: "./cryptos/wbtc.svg", coingeckoId: "wrapped-bitcoin" },
  { id: "Wrapped Ether", name: "Wrapped Ether", token: "WETH", icon: "./cryptos/etc.svg", coingeckoId: "weth" }
];

const collectionType = 'pinnedCryptos';

export default async function handler(req, res) {
  try {
    // Fetch data from database
    let cryptosFromDb = await getCryptos(collectionType);

    // If no data in database, fetch from CoinGecko and save to database
    if (cryptosFromDb.length === 0) {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price",
        {
          params: {
            ids: pinnedCryptos.map((crypto) => crypto.coingeckoId).join(","),
            vs_currencies: "usd"
          }
        }
      );

      // Add the price attribute to each cryptocurrency
      const prices = response.data;
      const pinnedCryptosWithPrices = pinnedCryptos.map((crypto) => ({
        ...crypto,
        price: prices[crypto.coingeckoId]?.usd || 0
      }));

      // Save to database
      await saveCryptos(pinnedCryptosWithPrices, collectionType);

      res.status(200).json(pinnedCryptosWithPrices);
    } else {
      res.status(200).json(cryptosFromDb);
    }
  } catch (error) {
    console.error("Error:", error);

    // If error occurs, try to fetch from CoinGecko API
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price",
        {
          params: {
            ids: pinnedCryptos.map((crypto) => crypto.coingeckoId).join(","),
            vs_currencies: "usd"
          }
        }
      );

      // Add the price attribute to each cryptocurrency
      const prices = response.data;
      const pinnedCryptosWithPrices = pinnedCryptos.map((crypto) => ({
        ...crypto,
        price: prices[crypto.coingeckoId]?.usd || 0
      }));

      res.status(200).json(pinnedCryptosWithPrices);
    } catch (apiError) {
      console.error("Error fetching from CoinGecko:", apiError);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
