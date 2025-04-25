import { server } from "../mocks/server";
import { HttpResponse, delay, http } from "msw";
import { describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen, waitFor } from "@testing-library/react";
import ProductsList from "../../src/components/ProductsList";
import React from "react";
import { categories, productsData } from "../data";
import userEvent from "@testing-library/user-event";
import { Product } from "../../src/App";

describe("Product List", () => {
  const renderComponent = (
    products = productsData,
    deleteProduct = vi.fn(),
    isLoadingProducts = false,
    productsError: null | Error = null
  ) => {
    render(
      <ProductsList
        products={products}
        deleteProduct={deleteProduct}
        isLoadingProducts={isLoadingProducts}
        productsError={productsError}
      />
    );
  };

  it("shows all the products(unfiltered) in the initial render", () => {
    renderComponent();

    productsData.forEach((p) =>
      expect(
        screen.getByRole("cell", {
          name: p.description,
        })
      ).toBeInTheDocument()
    );
  });

  it("should render the error if categories cannot be fetched", async () => {
    server.use(
      http.get("http://localhost:8888/categories", () => HttpResponse.error())
    );
    renderComponent();

    expect(await screen.findByText(/failed to fetch/i)).toBeInTheDocument();
  });

  it("should render the category filter with the right options", async () => {
    renderComponent([]);
    const filter = await screen.findByRole("combobox");
    expect(filter).toHaveTextContent(/categories/i);

    const user = userEvent.setup();
    await user.click(filter);
    const options = screen.getAllByRole("option");

    const uiCategories = [{ name: "All categories" }, ...categories];

    expect(options.length).toBe(uiCategories.length);
    uiCategories.forEach((c) => {
      expect(screen.getByRole("option", { name: c.name })).toBeInTheDocument();
    });
  });

  it.each(categories)(
    "should filter products by $name",
    async ({ id, name }) => {
      let filteredProducts: Product[] = [];
      let theRestOfProducts: Product[] = [];

      productsData.forEach((p) => {
        if (p.category_id === id) {
          filteredProducts.push(p);
        } else {
          theRestOfProducts.push(p);
        }
      });

      renderComponent();

      const user = userEvent.setup();
      const filter = await screen.findByRole("combobox");
      expect(filter).toHaveTextContent(/categories/i);
      await user.selectOptions(filter, name);
      // screen.logTestingPlaygroundURL();

      filteredProducts.forEach((p) => {
        expect(
          screen.getByRole("cell", {
            name: p.description,
          })
        ).toBeInTheDocument();
      });

      theRestOfProducts.forEach((p) => {
        expect(
          screen.queryByRole("cell", {
            name: p.description,
          })
        ).not.toBeInTheDocument();
      });
    }
  );

  it("should call deleteProduct when the delete button is clicked", async () => {
    const deleteProduct = vi.fn();
    renderComponent(productsData, deleteProduct);
    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
    const user = userEvent.setup();

    for (const [index, deleteButton] of deleteButtons.entries()) {
      await user.click(deleteButton);
      expect(deleteProduct).toHaveBeenCalledWith(productsData[index].id);
    }

    expect(deleteButtons.length).toBe(productsData.length);
    expect(deleteProduct).toHaveBeenCalledTimes(productsData.length);
  });

  it("should show the total amount of all products", () => {
    renderComponent();

    const total = productsData.reduce((total, product) => {
      return total + product.amount;
    }, 0);

    expect(screen.getByText(/total/i)).toBeInTheDocument();
    expect(screen.getByText(`${total} $`)).toBeInTheDocument();
  });

  it("should show the total amount of filtered products", async () => {
    const filteredProducts = productsData.filter((p) => p.category_id === 1);
    const total = filteredProducts.reduce((total, product) => {
      return total + product.amount;
    }, 0);

    renderComponent();

    const user = userEvent.setup();
    const filter = await screen.findByRole("combobox");
    expect(filter).toHaveTextContent(/categories/i);

    await user.selectOptions(filter, categories.find((c) => c.id === 1)?.name!);

    expect(screen.getByText(/total/i)).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", {
        name: new RegExp(`${total}\\s*\\$`, "i"),
      })
    ).toBeInTheDocument();
    // expect(
    //   screen.getByText(new RegExp(`${total}\\s*\\$`, "i"))
    // ).toBeInTheDocument();
  });

  it("should show the loading indicator before the products has been fetched", () => {
    renderComponent([], vi.fn(), true, null);

    expect(screen.getByText(/loading products/i)).toBeInTheDocument();
  });

  it("should show the error message if the products cannot be fetched", () => {
    renderComponent([], vi.fn(), false, new Error("Error fetching products"));

    expect(screen.getByText(/error fetching products/i)).toBeInTheDocument();
  });
});
