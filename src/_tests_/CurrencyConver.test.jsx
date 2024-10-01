import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import CurrencyConverter from "../components/CurrencyConverter";
import { fetchLatestRates } from "../utils/api";
import "@testing-library/jest-dom";
// Mock the fetchLatestRates API
jest.mock("../utils/api", () => ({
  fetchLatestRates: jest.fn(),
}));

describe("CurrencyConverter Component", () => {
  // Mock API response before each test
  beforeEach(() => {
    fetchLatestRates.mockResolvedValue({
      USD: 0.75,
      EUR: 0.65,
      GBP: 0.55,
      JPY: 80,
      CAD: 0.95,
    });
  });
  // Test if the input field is rendered
  it("renders the input field", async () => {
    await act(async () => {
      render(<CurrencyConverter />);
    });

    expect(
      screen.getByPlaceholderText(/enter amount in aud/i)
    ).toBeInTheDocument();
  });
  // Test if the input value updates when typing
  it("updates the input value when typed", async () => {
    await act(async () => {
      render(<CurrencyConverter />);
    });

    const input = screen.getByPlaceholderText(/enter amount in aud/i);

    fireEvent.change(input, { target: { value: "100" } });

    expect(input.value).toBe("100");
  });
});
