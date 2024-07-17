import axios from 'axios';

export default async function handler(req, res) {
  const cryptos = [
      {
          id: 'Etherium',
          name: 'Etherium',
          token: 'ETH',
          coingeckoId: 'ethereum',
          icon: './cryptos/eth.svg',
      },
      {
          id: 'Dai Stablecoin',
          name: 'Dai Stablecoin',
          token: 'DAI',
          coingeckoId: 'dai',
          icon: './cryptos/dai.svg',
      },
      {
          id: 'USD Coin',
          name: 'USD Coin',
          token: 'USDC',
          coingeckoId: 'usd-coin',
          icon: './cryptos/usdc.svg',
      },
      {
          id: 'Tether USD',
          name: 'Tether USDTether',
          token: 'USDT',
          coingeckoId: 'tether',
          icon: './cryptos/usdt.svg',
      },
      {
          id: 'Wrapped BTC',
          name: 'Wrapped BTC',
          token: 'WBTC',
          coingeckoId: 'wrapped-bitcoin',
          icon: './cryptos/wbtc.svg',
      },
      {
          id: 'Wrapped Ether',
          name: 'Wrapped Ether',
          token: 'WETH',
          coingeckoId: 'weth',
          icon: './cryptos/etc.svg',
      },
      {
          id: '0x Protocol',
          name: '0x Protocol',
          token: 'ZRX',
          coingeckoId: '0x',
          icon: './cryptos/zrx.svg',
      },
      {
          id: '1inch',
          name: '1inch',
          token: '1INCH',
          coingeckoId: '1inch',
          icon: './cryptos/1inch.svg',
      },
      {
          id: 'Aave',
          name: 'Aave',
          token: 'AAVE',
          coingeckoId: 'aave',
          icon: './cryptos/aave.svg',
      },
      {
          id: 'AdEx',
          name: 'AdEx',
          token: 'ADX',
          coingeckoId: 'adx-net',
          icon: './cryptos/adx.svg',
      },
      {
          id: 'AIOZ Network',
          name: 'AIOZ Network',
          token: 'AIOZ',
          coingeckoId: 'aioz-network',
          icon: './cryptos/atlas.svg',
      },
      {
          id: 'Ampleforth Governance',
          name: 'Ampleforth Governance',
          token: 'FORTH',
          coingeckoId: 'ampleforth-governance-token',
          icon: './cryptos/ampl.svg',
      },
  ];

  try {
      // Fetch the prices from CoinGecko API
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
          params: {
              ids: cryptos.map(crypto => crypto.coingeckoId).join(','),
              vs_currencies: 'usd',
          }
      });

      // Add the price attribute to each cryptocurrency
      const prices = response.data;
      const cryptosWithPrices = cryptos.map(crypto => ({
          ...crypto,
          price: prices[crypto.coingeckoId]?.usd || 0
      }));

      res.status(200).json(cryptosWithPrices);
  } catch (error) {
      console.error('Error fetching prices:', error);
      res.status(500).json({ error: 'Error fetching prices' });
  }
}
