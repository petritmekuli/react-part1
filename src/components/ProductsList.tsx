import { Product } from "../App";

interface Props {
  products: Product[];
}
function ProductsList({ products }: Props) {
  return (
    <div className="mt-5">
      <div className="mb-3">
        <select
          id="category"
          name="category"
          //   value={form.category}
          //   onChange={handleChange}
          className="form-select"
        >
          <option value="">All categories</option>
          <option value="1">Groceries</option>
          <option value="2">Utilities</option>
          <option value="3">Entertainment</option>
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
          {products.map((p) => (
            <tr>
              <td>{p.description}</td>
              <td>{p.amount}</td>
              <td>{p.category}</td>
              <td>Delete</td>
            </tr>
          ))}
          <tr>
            <td>Total</td>
            <td>
              {products.reduce((total, product) => {
                return total + product.amount;
              }, 0)}
            </td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ProductsList;
