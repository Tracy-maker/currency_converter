"use client";
import React, { useEffect, useState } from "react";
import { fetchLatestRates } from "../utils/api";
import ConversionTable from "./ConversionTable";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [rates, setRates] = useState({});
  const [currencies] = useState(['USD', 'EUR', 'GBP', 'JPY', 'CAD']); 

  useEffect(() => {
    const getRates = async () => {
      const fetchedRates = await fetchLatestRates();
      if (fetchedRates) {
        setAmount(fetchedRates);
      }
    };
    getRates();
  }, []);

  return (
    <div className="mt-4">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 rounded w-full"
        placeholder="Enter amount in AUD"
      />
      <ConversionTable amount={amount} rates={rates} currencies={currencies}/>
    </div>
  );
};

export default CurrencyConverter;
