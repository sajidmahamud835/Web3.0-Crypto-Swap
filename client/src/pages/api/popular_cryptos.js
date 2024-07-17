import axios from 'axios';

export default async function handler(req, res) {
  const popular_cryptos = [
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

  try {
      // Fetch the prices from CoinGecko API
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
          params: {
              ids: popular_cryptos.map(crypto => crypto.coingeckoId).join(','),
              vs_currencies: 'usd',
          }
      });

      // Add the price attribute to each cryptocurrency
      const prices = response.data;
      const popular_cryptos_with_prices = popular_cryptos.map(crypto => ({
          ...crypto,
          price: prices[crypto.coingeckoId]?.usd || 0
      }));

      res.status(200).json(popular_cryptos_with_prices);
  } catch (error) {
      console.error('Error fetching prices:', error);
      res.status(500).json({ error: 'Error fetching prices' });
  }
}
