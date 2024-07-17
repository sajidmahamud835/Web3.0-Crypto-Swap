import Web3 from 'web3';
import fetch from 'node-fetch';
require('dotenv').config();

const { ZeroX_API_KEY, INFURA_PROJECT_ID, SOPHILA_TESTNET_URL } = process.env;

if (!INFURA_PROJECT_ID || !SOPHILA_TESTNET_URL || !ZeroX_API_KEY) {
  throw new Error('Missing required environment variables');
}

const web3 = new Web3(new Web3.providers.HttpProvider(SOPHILA_TESTNET_URL));

const getSwapPrice = async (fromToken, toToken, amount) => {
  const API_URL = 'https://api.0x.org/swap/v1/price';
  const queryParams = {
    sellToken: fromToken,
    buyToken: toToken,
    sellAmount: amount,
    chainId: 1,
  };

  const queryString = new URLSearchParams(queryParams).toString();
  const response = await fetch(`${API_URL}?${queryString}`, {
    headers: {
      'Content-Type': 'application/json',
      '0x-api-key': ZeroX_API_KEY,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    const errorMessage = data.validationErrors?.map(err => err.reason).join(', ') || response.statusText;
    throw new Error(`Failed to fetch price: ${errorMessage}`);
  }

  return data;
};

const getSwapQuote = async (fromToken, toToken, amount) => {
  const API_URL = 'https://api.0x.org/swap/v1/quote';
  const queryParams = {
    sellToken: fromToken,
    buyToken: toToken,
    sellAmount: amount,
    chainId: 42,
    slippageBps: 100,
  };

  const queryString = new URLSearchParams(queryParams).toString();
  const response = await fetch(`${API_URL}?${queryString}`, {
    headers: {
      'Content-Type': 'application/json',
      '0x-api-key': ZeroX_API_KEY,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    const errorMessage = data.validationErrors?.map(err => err.reason).join(', ') || response.statusText;
    throw new Error(`Failed to fetch quote: ${errorMessage}`);
  }

  return data;
};

export default async function handler(req, res) {
  const { action, fromToken, toToken, amount } = req.query;

  try {
    let result;
    if (action === 'getPrice') {
      result = await getSwapPrice(fromToken, toToken, amount);
    } else if (action === 'getQuote') {
      result = await getSwapQuote(fromToken, toToken, amount);
    } else {
      throw new Error('Invalid action specified');
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
}
