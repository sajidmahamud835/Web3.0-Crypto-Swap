import apiClient from '../utils/apiClient';

interface Currency {
    token: string;
    icon: string; // Path to local SVG or URL to fetch dynamically
    price: number;
  }
  
  export const getCurrencyData = async (): Promise<Currency[]> => {
    try {
      const response = await apiClient.get('/api/v3/ticker/allTickers'); // Adjust endpoint as per MEXC API docs
      const data = response.data;
  
      // Example: Mapping MEXC API response to desired format
      const formattedData: Currency[] = data.map((item: any) => ({
        token: item.symbol,
        icon: `./cryptos/${item.symbol.toLowerCase()}.svg`, // Assuming icons are named according to symbol
        price: parseFloat(item.last),
      }));
  
      return formattedData;
    } catch (error) {
      console.error('Failed to fetch currency data from MEXC API', error);
      throw error;
    }
  };

export const getMarketData = async (symbol: string) => {
  const response = await apiClient.get(`/api/v3/ticker/price?symbol=${symbol}`);
  return response.data;
};

export const createSwap = async (params: any) => {
  const response = await apiClient.post('/api/v3/order', params);
  return response.data;
};
