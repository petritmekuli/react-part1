import { describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen, waitFor } from "@testing-library/react";
import ProductsList from "../../src/components/ProductsList";
import React from "react";
import { productsData } from "../data";
import userEvent from "@testing-library/user-event";

describe("App", () => {
  const renderComponent = (
    products = productsData,
    deleteProduct = vi.fn()
  ) => {
    render(<ProductsList products={products} deleteProduct={deleteProduct} />);
  };

  it("render all products when no category is selected", () => {
    renderComponent();
    productsData.forEach((p) =>
      expect(
        screen.getByRole("cell", {
          name: p.description,
        })
      ).toBeInTheDocument()
    );
  });
  it("should render the category filter with the right options", async () => {
    renderComponent([]);
    const filter = screen.getByRole("combobox");
    expect(filter).toHaveTextContent(/categories/i);

    const user = userEvent.setup();
    await user.click(filter);
    const options = screen.getAllByRole("option");
    expect(options.length).toBeGreaterThan(1); //the first option is for the default one.
    // screen.logTestingPlaygroundURL();
  });

  it("should", () => {});
});
