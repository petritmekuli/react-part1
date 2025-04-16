import { useState } from "react";
import "./App.css";

import ProductForm from "./components/ProductForm";
import ProductsList from "./components/ProductsList";
import { productsData } from "./data";

export interface Product {
  description: string;
  amount: number;
  category: string;
}

function App() {
  const [products, setProducts] = useState<Product[]>(productsData);

  return (
    <>
      <ProductForm />
      <ProductsList products={products} />
    </>
  );
}

export default App;
