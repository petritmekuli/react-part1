import { useState } from "react";
import { Product } from "../App";

interface Props {
  products: Product[];
  deleteProduct: (id: number) => void;
}

function ProductsList({ products, deleteProduct }: Props) {
  const [category, setCategory] = useState("");

  let productsToBeDisplayed =
    category === ""
      ? products
      : products.filter((p) => p.category === category);

  return (
    <div className="mt-5">
      <div className="mb-3">
        <select
          id="category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="form-select"
        >
          <option value="">All categories</option>
          <option value="Groceries">Groceries</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
        </select>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {productsToBeDisplayed.map((p) => (
            <tr>
              <td>{p.description}</td>
              <td>{p.amount} $</td>
              <td>{p.category}</td>
              <td>
                {/* button */}
                <button
                  onClick={() => deleteProduct(p.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <th>Total</th>
            <th>
              {productsToBeDisplayed.reduce((total, product) => {
                return total + product.amount;
              }, 0)}{" "}
              $
            </th>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ProductsList;
