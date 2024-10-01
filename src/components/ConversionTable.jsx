import React from "react";
import CountryFlag from "react-country-flag";

const countryInfo = {
  USD: { code: "US", symbol: "$" },
  EUR: { code: "EU", symbol: "€" },
  GBP: { code: "GB", symbol: "£" },
  JPY: { code: "JP", symbol: "¥" },
  CAD: { code: "CA", symbol: "CA$" },
};

const ConversionTable = ({
  amount,
  rates,
  currencies,
  baseCurrency = "AUD",
  onCurrencyClick,
}) => {
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
                countryCode={countryInfo[currency].code}
                svg
                style={{ width: "30px", height: "20px", marginRight: "10px" }}
                alt={`${currency} flag`}
              />
              <p className="text-xl font-bold">{currency}</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-semibold">
                {rates[currency]
                  ? `${countryInfo[currency].symbol}${(
                      amount * rates[currency]
                    ).toFixed(2)} ${currency}`
                  : "N/A"}
              </p>

              <p className="text-s text-gray-600">
                {rates[currency]
                  ? `1 ${baseCurrency} = ${rates[currency].toFixed(
                      4
                    )} ${currency}`
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConversionTable;
