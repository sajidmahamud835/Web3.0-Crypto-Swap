// pages/api/currencies.js

import CoinGecko from 'coingecko-api';

const CoinGeckoClient = new CoinGecko();

const fetchCurrencies = async (req, res) => {
  try {
    const response = await CoinGeckoClient.coins.markets({
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 100,
      page: 1,
      sparkline: false,
    });

    const data = response.data.map(coin => ({
      token: coin.symbol.toUpperCase(),
      icon: coin.image,
      price: coin.current_price,
    }));

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch data' });
  }
};

export default fetchCurrencies;
