const API_KEY = process.env.NEXT_PUBLIC_OPENEXCHANGE_API_KEY;
const BASE_URL = "https://openexchangerates.org/api";

// Latest data on exchange rates
export const fetchLatestRates = async (baseCurrency = "AUD") => {
  try {
    const response = await fetch(
      `${BASE_URL}/latest.json?app_id=${API_KEY}&base=${baseCurrency}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch the latest rates");
    }

    const data = await response.json();
    return data.rates;
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

    const response = await fetch(
      `${BASE_URL}/time-series.json?app_id=${API_KEY}&start=${startDate}&end=${formattedToday}&symbols=${currency}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch historical rates");
    }

    const data = await response.json();
    console.log("API data:", data);

    return Object.entries(data.rates).map(([date, rateObject]) => ({
      date: new Date(date).toLocaleDateString("en-GB", {
        month: "short",
        day: "numeric",
      }),
      rate: rateObject[currency],
    }));
  } catch (error) {
    console.error("Error fetching historical rates:", error);
    return [];
  }
};
