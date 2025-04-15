import React, { FormEvent, useState } from "react";

function ProductForm() {
  const [form, setForm] = useState({
    description: "",
    amount: "",
    category: "",
  });

  const [errors, setErrors] = useState({
    description: "",
    amount: "",
    category: "",
  });

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "description":
        return value.trim() === "" ? "Description is required" : "";
      case "amount":
        return value === "" || Number(value) <= 0
          ? "Amount must be greater than 0"
          : "";
      case "category":
        return value === "" ? "Category is required" : "";
      default:
        return "";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const validateForm = () => {
    const newErrors = {
      description: validateField("description", form.description),
      amount: validateField("amount", form.amount),
      category: validateField("category", form.category),
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log(form);
  };

  return (
    <form onSubmit={handleSubmit} className="mx-5">
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
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={form.category}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Select category</option>
          <option value="one">One</option>
          <option value="two">Two</option>
          <option value="three">Three</option>
        </select>
        {errors.category && (
          <div className="form-text text-danger">{errors.category}</div>
        )}
      </div>

      <button className="btn btn-primary">Submit</button>
    </form>
  );
}

export default ProductForm;
