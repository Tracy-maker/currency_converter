const API_KEY = process.env.NEXT_PUBLIC_OPENEXCHANGE_API_KEY;
const BASE_URL = 'https://openexchangerates.org/api';

export const fetchLatestRates = async (baseCurrency = 'AUD') => {
  try {
    const response = await fetch(
      `${BASE_URL}/latest.json?app_id=${API_KEY}&base=${baseCurrency}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch the latest rates');
    }
    
    const data = await response.json();
    return data.rates; 
  } catch (error) {
    console.error('Error fetching latest rates:', error);
    return null;
  }
};