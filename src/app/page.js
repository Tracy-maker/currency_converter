import React from 'react';
import CurrencyConverter from "@/components/CurrencyConverter";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Currency Converter</h1>
      <CurrencyConverter />
    </div>
  );
}
