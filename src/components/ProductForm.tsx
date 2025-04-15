import React from "react";

function ProductForm() {
  return (
    <form action="" className="mx-5">
      <div className="mb-3">
        <label
          className="form-label"
          htmlFor="description"
          id="descriptionLabel"
        >
          Description
        </label>
        <input className="form-control" type="text" id="description" />
        <div className="form-text text-danger" id="descriptionError">
          error
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="amount" id="amountLabel">
          Amount
        </label>
        <input type="number" className="form-control" id="amount" />
        <div className="form-text text-danger" id="amountError">
          error
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="category" id="categoryLabel">
          Category
        </label>
        <select className="form-select" aria-label="Default select example">
          {/* <option selected>Open this select menu</option> */}
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
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
