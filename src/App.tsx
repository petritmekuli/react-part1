import { useState } from "react";
import "./App.css";

import ProductForm from "./components/ProductForm";
import ProductsList from "./components/ProductsList";
import { productsData } from "./data";

export interface Product {
  id: number;
  description: string;
  amount: number;
  category_id: number;
}
export interface ProductForm {
  description: string;
  amount: number;
  category_id: number;
}

function App() {
  const [products, setProducts] = useState<Product[]>(productsData);

  return (
    <>
      <ProductForm
        onSubmit={
          (product) =>
            setProducts([...products, { id: products.length + 1, ...product }])
          //We could also make a POST request to the server here
        }
      />

      <ProductsList
        products={products}
        deleteProduct={(id: number) => {
          setProducts(products.filter((p) => p.id !== id));
        }}
      />
    </>
  );
}

export default App;
