import React from "react";
import { render, screen, act } from "@testing-library/react";
import HistoricalChart from "../components/HistoricalChart";
import { fetchHistoricalRates } from "../utils/api";
import "@testing-library/jest-dom";

// Mock the fetchHistoricalRates API
jest.mock("../utils/api", () => ({
  fetchHistoricalRates: jest.fn(),
}));

// Mock data for testing
const mockHistoricalData = [
  { date: "2024-09-15", rate: 0.75 },
  { date: "2024-09-14", rate: 0.76 },
];

describe("HistoricalChart Component", () => {
  // Set up mockResolvedValue before each test
  beforeEach(() => {
    fetchHistoricalRates.mockResolvedValue(mockHistoricalData);
  });
  // Test if loading message is rendered initially
  it("renders loading initially", () => {
    render(<HistoricalChart currency="USD" />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
  // Test if chart is rendered after data is available
  it("renders chart when data is available", async () => {
    await act(async () => {
      render(<HistoricalChart currency="USD" />);
    });
    // Check if the chart title contains "Past 14 Days Exchange Rate for"
    expect(
      screen.getByText((content) =>
        content.includes("Past 14 Days Exchange Rate for")
      )
    ).toBeInTheDocument();
  });
});
