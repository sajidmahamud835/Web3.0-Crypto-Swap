import axios from 'axios';
import { getCryptos, saveCryptos } from '../models/crypto';

const cryptos = [
  { id: 'Etherium', name: 'Etherium', token: 'ETH', coingeckoId: 'ethereum', icon: './cryptos/eth.svg' },
  { id: 'Dai Stablecoin', name: 'Dai Stablecoin', token: 'DAI', coingeckoId: 'dai', icon: './cryptos/dai.svg' },
  { id: 'USD Coin', name: 'USD Coin', token: 'USDC', coingeckoId: 'usd-coin', icon: './cryptos/usdc.svg' },
  { id: 'Tether USD', name: 'Tether USDTether', token: 'USDT', coingeckoId: 'tether', icon: './cryptos/usdt.svg' },
  { id: 'Wrapped BTC', name: 'Wrapped BTC', token: 'WBTC', coingeckoId: 'wrapped-bitcoin', icon: './cryptos/wbtc.svg' },
  { id: 'Wrapped Ether', name: 'Wrapped Ether', token: 'WETH', coingeckoId: 'weth', icon: './cryptos/etc.svg' },
  { id: '0x Protocol', name: '0x Protocol', token: 'ZRX', coingeckoId: '0x', icon: './cryptos/zrx.svg' },
  { id: '1inch', name: '1inch', token: '1INCH', coingeckoId: '1inch', icon: './cryptos/1inch.svg' },
  { id: 'Aave', name: 'Aave', token: 'AAVE', coingeckoId: 'aave', icon: './cryptos/aave.svg' },
  { id: 'AdEx', name: 'AdEx', token: 'ADX', coingeckoId: 'adx-net', icon: './cryptos/adx.svg' },
  { id: 'AIOZ Network', name: 'AIOZ Network', token: 'AIOZ', coingeckoId: 'aioz-network', icon: './cryptos/atlas.svg' },
  { id: 'Ampleforth Governance', name: 'Ampleforth Governance', token: 'FORTH', coingeckoId: 'ampleforth-governance-token', icon: './cryptos/ampl.svg' },
];

const collectionType = 'cryptos';  // Define the collection name for your cryptos

export default async function handler(req, res) {
  try {
    // Fetch data from database
    let cryptosFromDb = await getCryptos(collectionType);

    // If no data in database, fetch from CoinGecko and save to database
    if (cryptosFromDb.length === 0) {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
        params: {
          ids: cryptos.map(crypto => crypto.coingeckoId).join(','),
          vs_currencies: 'usd',
        },
      });

      const prices = response.data;
      const cryptosWithPrices = cryptos.map(crypto => ({
        ...crypto,
        price: prices[crypto.coingeckoId]?.usd || 0,
      }));

      // Save to database
      await saveCryptos(cryptosWithPrices, collectionType);

      res.status(200).json(cryptosWithPrices);
    } else {
      res.status(200).json(cryptosFromDb);
    }
  } catch (error) {
    console.error('Error:', error);

    // If error occurs, try to fetch from CoinGecko API
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
        params: {
          ids: cryptos.map(crypto => crypto.coingeckoId).join(','),
          vs_currencies: 'usd',
        },
      });

      const prices = response.data;
      const cryptosWithPrices = cryptos.map(crypto => ({
        ...crypto,
        price: prices[crypto.coingeckoId]?.usd || 0,
      }));

      res.status(200).json(cryptosWithPrices);
    } catch (apiError) {
      console.error('Error fetching from CoinGecko:', apiError);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
