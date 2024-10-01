import React from 'react';
import CurrencyConverter from "@/components/CurrencyConverter";

export default function Home() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6">Currency Converter</h1>
      <div className="w-full max-w-lg mx-auto bg-white shadow-md rounded-lg p-4 sm:p-6">
        <CurrencyConverter />
      </div>
    </div>
  );
}
