import { useState } from "react";
import { Category, Product } from "../App";
// import { categories } from "../data";

interface Props {
  products: Product[];
  deleteProduct: (id: number) => void;
  isLoadingProducts: boolean;
  productsError: Error | null;
  categories: Category[];
  isLoadingCategories: boolean;
  categoriesError: Error | null;
}

function ProductsList({
  products,
  deleteProduct,
  isLoadingProducts,
  productsError,
  categories,
  isLoadingCategories,
  categoriesError,
}: Props) {
  const [categoryId, setCategoryId] = useState("");

  let productsToBeDisplayed =
    categoryId === ""
      ? products
      : products.filter((p) => p.category_id === parseInt(categoryId));

  return (
    <div className="mt-5">
      <h1 className="mb-3">List Of Products</h1>
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
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
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
          {productsError ? (
            <tr>
              <td>{productsError.message}</td>
            </tr>
          ) : isLoadingProducts ? (
            <tr>
              <td>Loading Products...</td>
            </tr>
          ) : products.length === 0 ? (
            <tr>
              <td>No products found.</td>
            </tr>
          ) : (
            <>
              {productsToBeDisplayed.map((p, index) => (
                <tr key={index}>
                  <td>{p.description}</td>
                  <td>{p.amount} $</td>
                  <td>{categories.find((c) => c.id == p.category_id)?.name}</td>
                  <td>
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
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsList;
