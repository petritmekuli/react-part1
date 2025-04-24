import "@testing-library/jest-dom/vitest";
import { describe, expect, it, vi } from "vitest";
import ProductForm from "../../src/components/ProductForm";
import { render, screen } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
describe("Product Form", () => {
  const validProduct = {
    description: "::description::",
    amount: "1",
    category_id: "1",
  };
  it("should render all the form fields", () => {
    const mockOnSubmit = vi.fn();

    render(<ProductForm onSubmit={mockOnSubmit} />);

    const descriptionInput = screen.getByLabelText(/description/i);
    const amountInput = screen.getByLabelText(/amount/i);
    const categoryInput = screen.getByLabelText(/category/i);
    const submitButton = screen.getByRole("button", { name: /submit/i });

    expect(descriptionInput).toBeInTheDocument();
    expect(amountInput).toBeInTheDocument();
    expect(categoryInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("should submit the right data", async () => {
    const mockOnSubmit = vi.fn();
    render(<ProductForm onSubmit={mockOnSubmit} />);
    const descriptionInput = screen.getByLabelText(/description/i);
    const amountInput = screen.getByLabelText(/amount/i);
    const categoryInput = screen.getByLabelText(/category/i);
    const submitButton = screen.getByRole("button", { name: /submit/i });

    const user = userEvent.setup();
    await user.type(descriptionInput, validProduct.description);
    await user.type(amountInput, validProduct.amount);
    await user.selectOptions(categoryInput, validProduct.category_id);
    await user.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      ...validProduct,
      category_id: parseInt(validProduct.category_id),
      amount: parseInt(validProduct.amount),
    });
  });

  it.each([
    {
      scenario: "missing",
      descriptionValue: " ",
      errorMessage: "required",
    },
    {
      scenario: "starting with numbers",
      descriptionValue: "1description",
      errorMessage: "cannot start with a number",
    },
  ])(
    "should show $errorMessage when description is $scenario",
    async ({ errorMessage, descriptionValue }) => {
      render(<ProductForm onSubmit={vi.fn()} />);
      const descriptionInput = screen.getByLabelText(/description/i);
      const amountInput = screen.getByLabelText(/amount/i);
      const categoryInput = screen.getByLabelText(/category/i);
      const submitButton = screen.getByRole("button", { name: /submit/i });

      const user = userEvent.setup();
      await user.type(descriptionInput, descriptionValue);
      await user.type(amountInput, validProduct.amount);
      await user.selectOptions(categoryInput, validProduct.category_id);
      await user.click(submitButton);

      expect(
        screen.getByText(new RegExp(errorMessage, "i"))
      ).toBeInTheDocument();
    }
  );

  it.each([
    {
      scenario: "missing",
      amountValue: " ",
      errorMessage: "must be greater than 0",
    },
    {
      scenario: "0",
      amountValue: "0",
      errorMessage: "must be greater than 0",
    },
  ])(
    "should show $errorMessage when description is $scenario",
    async ({ errorMessage, amountValue }) => {
      render(<ProductForm onSubmit={vi.fn()} />);
      const descriptionInput = screen.getByLabelText(/description/i);
      const amountInput = screen.getByLabelText(/amount/i);
      const categoryInput = screen.getByLabelText(/category/i);
      const submitButton = screen.getByRole("button", { name: /submit/i });

      const user = userEvent.setup();
      await user.type(descriptionInput, validProduct.description);
      await user.type(amountInput, amountValue);
      await user.selectOptions(categoryInput, validProduct.category_id);
      await user.click(submitButton);

      expect(
        screen.getByText(new RegExp(errorMessage, "i"))
      ).toBeInTheDocument();
    }
  );

  it.each([
    {
      scenario: "missing",
      categoryValue: "",
      errorMessage: "required",
    },
  ])(
    "should show $errorMessage when category is $scenario",
    async ({ errorMessage, categoryValue }) => {
      render(<ProductForm onSubmit={vi.fn()} />);
      const descriptionInput = screen.getByLabelText(/description/i);
      const amountInput = screen.getByLabelText(/amount/i);
      const categoryInput = screen.getByLabelText(/category/i);
      const submitButton = screen.getByRole("button", { name: /submit/i });

      const user = userEvent.setup();
      await user.type(descriptionInput, validProduct.description);
      await user.type(amountInput, validProduct.amount);
      await user.selectOptions(categoryInput, categoryValue);
      await user.click(submitButton);

      expect(
        screen.getByText(new RegExp(errorMessage, "i"))
      ).toBeInTheDocument();
    }
  );
});
