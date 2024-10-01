"use client";
import React, { useState, useEffect } from "react";
import { fetchLatestRates} from "../utils/api";  
import ConversionTable from "./ConversionTable";
import HistoricalChart from "./HistoricalChart";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1); 
  const [rates, setRates] = useState({});
  const [currencies] = useState(['USD', 'EUR', 'GBP', 'JPY', 'CAD']);
  const [selectedCurrency, setSelectedCurrency] = useState(null);  

  useEffect(() => {
    const getRates = async () => {
      const fetchedRates = await fetchLatestRates(); 
      if (fetchedRates) {
        setRates(fetchedRates);
      }
    };
    getRates();
  }, []);

  const handleCurrencyClick = (currency) => {
    setSelectedCurrency(currency); 
  };

  const closeChart = () => {
    setSelectedCurrency(null);
  };

  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 rounded w-full"
        placeholder="Enter amount in AUD"
      />
      <ConversionTable
        amount={amount}
        rates={rates}
        currencies={currencies}
        onCurrencyClick={handleCurrencyClick} 
      />
    
    {selectedCurrency && (
        <HistoricalChart currency={selectedCurrency} onClose={closeChart} />
      )}
    </div>
  );
};

export default CurrencyConverter;
