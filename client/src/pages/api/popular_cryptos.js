import axios from 'axios';
import { getCryptos, saveCryptos } from '../models/crypto';

const popularCryptos = [
  {
    id: '0x Protocol',
    name: '0x Protocol',
    token: 'ZRX',
    icon: './cryptos/zrx.svg',
    coingeckoId: '0x',
  },
  {
    id: '1inch',
    name: '1inch',
    token: '1INCH',
    icon: './cryptos/1inch.svg',
    coingeckoId: '1inch',
  },
  {
    id: 'Aave',
    name: 'Aave',
    token: 'AAVE',
    icon: './cryptos/aave.svg',
    coingeckoId: 'aave',
  },
  {
    id: 'AdEx',
    name: 'AdEx',
    token: 'ADX',
    icon: './cryptos/adx.svg',
    coingeckoId: 'adx-net',
  },
  {
    id: 'AIOZ Network',
    name: 'AIOZ Network',
    token: 'AIOZ',
    icon: './cryptos/atlas.svg',
    coingeckoId: 'aioz-network',
  },
  {
    id: 'Ampleforth Governance',
    name: 'Ampleforth Governance',
    token: 'FORTH',
    icon: './cryptos/ampl.svg',
    coingeckoId: 'ampleforth-governance-token',
  },
];

const collectionType = 'popularCryptos';

export default async function handler(req, res) {
  try {
    // Fetch data from database
    let cryptosFromDb = await getCryptos(collectionType);

    // If no data in database, fetch from CoinGecko and save to database
    if (cryptosFromDb.length === 0) {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price',
        {
          params: {
            ids: popularCryptos.map((crypto) => crypto.coingeckoId).join(','),
            vs_currencies: 'usd',
          },
        }
      );

      // Add the price attribute to each cryptocurrency
      const prices = response.data;
      const popularCryptosWithPrices = popularCryptos.map((crypto) => ({
        ...crypto,
        price: prices[crypto.coingeckoId]?.usd || 0,
      }));

      // Save to database
      await saveCryptos(popularCryptosWithPrices, collectionType);

      res.status(200).json(popularCryptosWithPrices);
    } else {
      res.status(200).json(cryptosFromDb);
    }
  } catch (error) {
    console.error('Error:', error);

    // If error occurs, try to fetch from CoinGecko API
    try {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price',
        {
          params: {
            ids: popularCryptos.map((crypto) => crypto.coingeckoId).join(','),
            vs_currencies: 'usd',
          },
        }
      );

      // Add the price attribute to each cryptocurrency
      const prices = response.data;
      const popularCryptosWithPrices = popularCryptos.map((crypto) => ({
        ...crypto,
        price: prices[crypto.coingeckoId]?.usd || 0,
      }));

      res.status(200).json(popularCryptosWithPrices);
    } catch (apiError) {
      console.error('Error fetching from CoinGecko:', apiError);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
