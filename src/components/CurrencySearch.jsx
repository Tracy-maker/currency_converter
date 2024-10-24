import React from "react";

const CurrencySearch = ({ searchQuery, setSearchQuery }) => {
  return (
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="border p-2 rounded w-full mt-2"
      placeholder="Search for a currency (e.g., USD, EUR)"
    />
  );
};

export default CurrencySearch;
