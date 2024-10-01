import React from "react";
import CountryFlag from "react-country-flag";

const countryCodes = {
  USD: "US",
  EUR: "EU",
  GBP: "GB",
  JPY: "JP",
  CAD: "CA",
};

const ConversionTable = ({ amount, rates, currencies, onCurrencyClick }) => {
  return (
    <div className="mt-4 grid gap-4">
      {currencies.map((currency) => (
        <div
          key={currency}
          className="p-4 bg-gray-100 rounded shadow cursor-pointer"
          onClick={() => onCurrencyClick(currency)} 
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CountryFlag
                countryCode={countryCodes[currency]}
                svg
                style={{ width: "30px", height: "20px", marginRight: "10px" }}
                alt={`${currency} flag`}
              />
              <p className="text-xl font-bold">{currency}</p>
            </div>
            <p className="text-xl font-semibold">
              {rates[currency]
                ? `${(amount * rates[currency]).toFixed(2)} ${currency}`
                : "N/A"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConversionTable;
