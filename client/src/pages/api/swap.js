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
    chainId: 42, // Replace with your desired chain ID
  };

  const queryString = new URLSearchParams(queryParams).toString();
  const response = await fetch(`${API_URL}?${queryString}`, {
    headers: {
      'Content-Type': 'application/json',
      '0x-api-key': ZeroX_API_KEY,
    },
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch price: ${response.statusText}`);
  }

  return response.json();
};

const getSwapQuote = async (fromToken, toToken, amount) => {
  const API_URL = 'https://api.0x.org/swap/v1/quote';
  const queryParams = {
    sellToken: fromToken,
    buyToken: toToken,
    sellAmount: amount,
    chainId: 42, // Replace with your desired chain ID
    taker: '', // Specify the taker address if required
    txOrigin: '', // Specify the transaction origin address if required
    swapFeeRecipient: '', // Specify swap fee recipient address if required
    swapFeeBps: 0, // Specify swap fee in Bps if required
    swapFeeToken: '', // Specify swap fee token if required
    tradeSurplusRecipient: '', // Specify trade surplus recipient address if required
    gasPrice: '', // Specify target gas price in wei if required
    slippageBps: 100, // Specify maximum acceptable slippage in Bps (defaulting to 100)
    excludedSources: '', // Specify liquidity sources to exclude if needed
  };

  const queryString = new URLSearchParams(queryParams).toString();
  const response = await fetch(`${API_URL}?${queryString}`, {
    headers: {
      'Content-Type': 'application/json',
      '0x-api-key': ZeroX_API_KEY,
    },
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch quote: ${response.statusText}`);
  }

  return response.json();
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