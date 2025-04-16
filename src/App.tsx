import { useState } from "react";
import "./App.css";

import ProductForm from "./components/ProductForm";
import ProductsList from "./components/ProductsList";
import { productsData } from "./data";

export interface Product {
  id: number;
  description: string;
  amount: number;
  category: string;
}

function App() {
  const [products, setProducts] = useState<Product[]>(productsData);

  return (
    <>
      <ProductForm
        onSubmit={(product: Product) => setProducts([...products, product])}
        nextId={products.length + 1}
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
