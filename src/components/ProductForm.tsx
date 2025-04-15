import React, { FormEvent, useState } from "react";

function ProductForm() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log({
      description: description,
      amount: amount,
      category: category,
    });
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)} action="" className="mx-5">
      <div className="mb-3">
        <label
          className="form-label"
          htmlFor="description"
          id="descriptionLabel"
        >
          Description
        </label>
        <input
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="form-control"
          type="text"
          id="description"
        />
        <div className="form-text text-danger" id="descriptionError">
          error
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="amount" id="amountLabel">
          Amount
        </label>
        <input
          onChange={(e) => setAmount(parseInt(e.target.value))}
          value={amount}
          type="number"
          className="form-control"
          id="amount"
        />
        <div className="form-text text-danger" id="amountError">
          error
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="category" id="categoryLabel">
          Category
        </label>
        <select
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          className="form-select"
          aria-label="Default select example"
        >
          {/* <option selected>Open this select menu</option> */}
          <option value="one">One</option>
          <option value="two">Two</option>
          <option value="three">Three</option>
        </select>
        <div className="form-text text-danger" id="categoryError">
          error
        </div>
      </div>
      <div className="mb-3">
        <button className="btn btn-primary">Submit</button>
      </div>
    </form>
  );
}

export default ProductForm;
