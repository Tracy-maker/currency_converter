import React from "react";
import ConversionTable from "./ConversionTable";

const CurrencyConverter = () => {
  return (
    <div className="mt-4">
      <input
        className="border p-2 rounded w-full"
        placeholder="Enter amount in AUD"
      />
      <ConversionTable />
    </div>
  );
};

export default CurrencyConverter;
