import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import CoinGecko from 'coingecko-api';

const CoinGeckoClient = new CoinGecko();

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
  cache: new InMemoryCache(),
});

const tokenIcons = {
  ETH: './cryptos/eth.svg',
  BTC: './cryptos/btc.svg',
  XRP: './cryptos/xrp.svg',
  // Add more token icons as needed
};

export const getAllTokens = async () => {
  const GET_TOKENS = gql`
    {
      tokens(first: 1000) {
        id
        symbol
      }
    }
  `;

  const { data } = await client.query({ query: GET_TOKENS });
  return data.tokens;
};

export const getTokenPrices = async (tokens: any[]) => {
  const symbols = tokens.map(token => token.symbol.toLowerCase());
  const { data } = await CoinGeckoClient.simple.price({
    ids: symbols,
    vs_currencies: 'usd',
  });

  const formattedData = tokens.map(token => {
    const symbol = token.symbol.toUpperCase();
    return {
      token: symbol,
      icon: tokenIcons[symbol] || './cryptos/default.svg',
      price: data[symbol.toLowerCase()] ? data[symbol.toLowerCase()].usd : 0,
    };
  });

  return formattedData;
};
