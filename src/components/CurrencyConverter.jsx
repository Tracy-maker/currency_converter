"use client";
import React,{ useState, useEffect } from "react";
import { fetchLatestRates } from "../utils/api";
import ConversionTable from "./ConversionTable";
import HistoricalChart from "./HistoricalChart";
import CurrencySearch from "./CurrencySearch";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [rates, setRates] = useState({});
  const [currencies] = useState(["USD", "EUR", "GBP", "JPY", "CAD"]);
  const [filteredCurrencies, setFilteredCurrencies] = useState(currencies);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getRates = async () => {
      const fetchedRates = await fetchLatestRates();
      if (fetchedRates) {
        setRates(fetchedRates);
      }
    };
    getRates();
  }, []);

  useEffect(() => {
    const result = currencies.filter((currency) =>
      currency.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCurrencies(result);
  }, [searchQuery, currencies]);

  const handleCurrencyClick = (currency) => {
    setSelectedCurrency(currency);
  };

  const closeChart = () => {
    setSelectedCurrency(null);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d+$/.test(value) && value[0] !== "0") {
      setAmount(value);
    } else if (value === "") {
      setAmount("");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={handleAmountChange}
        className="border p-2 rounded w-full"
        placeholder="Enter amount in AUD"
      />
      <CurrencySearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <ConversionTable
        amount={amount}
        rates={rates}
        currencies={filteredCurrencies}
        onCurrencyClick={handleCurrencyClick}
      />

      {selectedCurrency && (
        <HistoricalChart currency={selectedCurrency} onClose={closeChart} />
      )}
    </div>
  );
};

export default CurrencyConverter;
