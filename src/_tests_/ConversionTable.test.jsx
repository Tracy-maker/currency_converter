import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ConversionTable from "../components/ConversionTable";

// Mock exchange rates for different currencies
const mockRates = {
  USD: 0.75,
  EUR: 0.65,
  GBP: 0.55,
  JPY: 80,
  CAD: 0.95,
};
// List of currencies for the table
const mockCurrencies = ["USD", "EUR", "GBP", "JPY", "CAD"];

describe("ConversionTable Component", () => {
  // Test if currencies and their respective rates are rendered correctly
  it("renders currencies and rates", () => {
    render(
      <ConversionTable
        amount={100}
        rates={mockRates}
        currencies={mockCurrencies}
        onCurrencyClick={() => {}}
      />
    );
    // Check if each currency and corresponding rate is displayed
    mockCurrencies.forEach((currency) => {
      expect(screen.getByText(currency)).toBeInTheDocument();
      expect(
        screen.getByText(
          new RegExp(`${(100 * mockRates[currency]).toFixed(2)}`)
        )
      ).toBeInTheDocument();
    });
  });
  // Test if the click handler is called when a currency is clicked
  it("calls onCurrencyClick when a currency is clicked", () => {
    const handleClick = jest.fn();
    render(
      <ConversionTable
        amount={100}
        rates={mockRates}
        currencies={mockCurrencies}
        onCurrencyClick={handleClick}
      />
    );

    const usdElements = screen.getAllByText(/USD/i);
    fireEvent.click(usdElements[0]);

    expect(handleClick).toHaveBeenCalledWith("USD");
  });
});
