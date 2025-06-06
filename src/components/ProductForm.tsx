import { ChangeEvent, FormEvent, useState } from "react";
import { Category, ProductForm as FormData } from "../App";
import { Action } from "../reducers/productsReducer";
// import { categories } from "../data";

interface Props {
  categories: Category[];
  isLoadingCategories: boolean;
  categoriesError: Error | null;
  dispatch: (action: Action) => void;
}

function ProductForm({
  categories,
  isLoadingCategories,
  categoriesError,
  dispatch,
}: Props) {
  const [form, setForm] = useState({
    description: "",
    amount: "",
    category_id: "",
  });

  const [errors, setErrors] = useState({
    description: "",
    amount: "",
    category_id: "",
  });

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "description":
        if (value.trim() === "") {
          return "Description is required";
        } else if (/^\d/.test(value)) {
          return "Description cannot start with a number";
        }
        return "";
      case "amount":
        return value === "" || Number(value) <= 0
          ? "Amount must be greater than 0"
          : "";
      case "category_id":
        return value === "" ? "Category is required" : "";
      default:
        return "";
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const validateForm = () => {
    const newErrors = {
      description: validateField("description", form.description),
      amount: validateField("amount", form.amount),
      category_id: validateField("category_id", form.category_id),
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const description = form.description
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    const product = {
      ...form,
      id: Date.now().toString(), //toString because json-server works properly only with string ids
      description: description,
      amount: parseInt(form.amount),
      category_id: parseInt(form.category_id),
    };

    // Pessimistic UI update
    fetch("http://localhost:8888/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to create product");
        }
        return res.json(); // Parse the JSON response
      })
      .then((createdProduct) => {
        dispatch({
          type: "added",
          product: createdProduct,
        });

        // Reset the form after successful submission
        setForm({ description: "", amount: "", category_id: "" });
      })
      .catch((error) => {
        alert("An error occurred while creating the product.");
      });
  };

  const formHasErrors = () => {
    return Object.values(errors).some((error) => error !== "");
  };

  return (
    <>
      <h1 className="mb-3">Create New Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="form-control"
          />
          {errors.description && (
            <div className="form-text text-danger">{errors.description}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            className="form-control"
          />
          {errors.amount && (
            <div className="form-text text-danger">{errors.amount}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="category_id" className="form-label">
            Category
          </label>
          {isLoadingCategories ? (
            <p>Loading categories...</p>
          ) : categoriesError ? (
            <p className="text-danger">Failed fetching categories</p>
          ) : categories.length === 0 ? (
            <p className="text-danger">No categories found.</p>
          ) : (
            <div className="mb-3">
              <select
                id="category_id"
                name="category_id"
                value={form.category_id}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">All categories</option>
                {categories.map((c) => (
                  <option value={c.id} key={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {errors.category_id && (
            <div className="form-text text-danger">{errors.category_id}</div>
          )}
        </div>

        <button className="btn btn-primary" disabled={formHasErrors()}>
          Submit
        </button>
      </form>
    </>
  );
}

export default ProductForm;
