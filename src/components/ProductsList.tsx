import { useEffect, useState } from "react";
import { Product } from "../App";
// import { categories } from "../data";

interface Category {
  id: number;
  name: string;
}

interface Props {
  products: Product[];
  deleteProduct: (id: number) => void;
  isLoadingProducts: boolean;
  productsError: Error | null;
}

function ProductsList({
  products,
  deleteProduct,
  isLoadingProducts,
  productsError,
}: Props) {
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [categoriesError, setCategoriesError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoadingCategories(true);
    fetch("http://localhost:8888/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setIsLoadingCategories(false);
      })
      .catch((err) => {
        setCategoriesError(err);
      })
      .finally(() => {
        setIsLoadingCategories(false);
      });
  }, []);

  let productsToBeDisplayed =
    categoryId === ""
      ? products
      : products.filter((p) => p.category_id === parseInt(categoryId));

  return (
    <div className="mt-5">
      {categoriesError ? (
        categoriesError.message
      ) : isLoadingCategories ? (
        "Loading categories..."
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
