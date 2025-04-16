function ProductsList() {
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
          <tr>
            <td>Milk</td>
            <td>5</td>
            <td>Groceries</td>
            <td>delete</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>20</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ProductsList;
