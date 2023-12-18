// src/utils/cryptoUtils.js
import axios from 'axios';

export const getCryptoPrices = async (cryptos = ['ethereum', 'bitcoin', 'litecoin']) => {
  try {
    const ids = cryptos.join(',');
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`);
    return response.data; // Returns an object with prices for each crypto
  } catch (error) {
    console.error('Error fetching cryptocurrency data:', error);
    return {};
  }
};
