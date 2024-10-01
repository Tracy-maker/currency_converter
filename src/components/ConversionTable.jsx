import React from "react";

const ConversionTable = ({ amount, rates, currencies }) => {
  return (
    <div className="mt-4 grid grid-cols-2 gap-4">
      {currencies.map((currency) => (
        <div key={currency} className="p-4 bg-gray-100 rounded shadow">
          <p className="text-xl font-bold">{currency}</p>
          <p>
            {rates[currency]
              ? `${(amount * rates[currency]).toFixed(2)} ${currency}`
              : "N/A"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ConversionTable;
