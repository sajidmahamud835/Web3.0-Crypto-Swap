import axios from 'axios';

export default async function handler(req, res) {
  const pinnedCryptos = [
    {
      id: "Ethereum",
      name: "Ethereum",
      token: "ETH",
      icon: "./cryptos/eth.svg",
      coingeckoId: "ethereum"
    },
    {
      id: "Dai Stablecoin",
      name: "Dai Stablecoin",
      token: "DAI",
      icon: "./cryptos/dai.svg",
      coingeckoId: "dai"
    },
    {
      id: "USD Coin",
      name: "USD Coin",
      token: "USDC",
      icon: "./cryptos/usdc.svg",
      coingeckoId: "usd-coin"
    },
    {
      id: "Tether USD",
      name: "Tether USD",
      token: "USDT",
      icon: "./cryptos/usdt.svg",
      coingeckoId: "tether"
    },
    {
      id: "Wrapped BTC",
      name: "Wrapped BTC",
      token: "WBTC",
      icon: "./cryptos/wbtc.svg",
      coingeckoId: "wrapped-bitcoin"
    },
    {
      id: "Wrapped Ether",
      name: "Wrapped Ether",
      token: "WETH",
      icon: "./cryptos/etc.svg",
      coingeckoId: "weth"
    }
  ];

  try {
    // Fetch the prices from CoinGecko API
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
  } catch (error) {
    console.error("Error fetching prices:", error);
    res.status(500).json({ error: "Error fetching prices" });
  }
}
