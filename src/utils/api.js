const API_KEY = process.env.NEXT_PUBLIC_OPENEXCHANGE_API_KEY; // Ensure this is defined in .env.local
const BASE_URL = "https://openexchangerates.org/api";

// Fetch the latest exchange rates
export const fetchLatestRates = async (baseCurrency = "AUD") => {
  try {
    const response = await fetch(
      `${BASE_URL}/latest.json?app_id=${API_KEY}&base=${baseCurrency}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch the latest rates");
    }

    const data = await response.json();
    return data.rates; // Return the rates object
  } catch (error) {
    console.error("Error fetching latest rates:", error);
    return null;
  }
};

// Get historical exchange rate data for the specified currency (last 14 days)
export const fetchHistoricalRates = async (currency) => {
  try {
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];

    const startDate = new Date(today.setDate(today.getDate() - 14))
      .toISOString()
      .split("T")[0];

    const url = `${BASE_URL}/time-series.json?app_id=${API_KEY}&start=${startDate}&end=${formattedToday}&symbols=${currency}&base=AUD`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch historical rates for ${currency}`);
    }

    const data = await response.json();

    if (!data || !data.rates) {
      throw new Error("Invalid data structure from API");
    }

    console.log("Full API response:", data);

    return Object.entries(data.rates).map(([date, rateObject]) => {
      const rate = rateObject[currency];
      return {
        date: new Date(date).toLocaleDateString("en-GB", {
          month: "short",
          day: "numeric",
        }),
        rate: rate !== undefined ? rate : "N/A",
      };
    });
  } catch (error) {
    console.error("Error fetching historical rates:", error);
    return [];
  }
};
