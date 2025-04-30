import { useEffect, useState } from "react";
import "./App.css";

import ProductForm from "./components/ProductForm";
import ProductsList from "./components/ProductsList";

export interface Category {
  id: number;
  name: string;
}

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
  const [products, setProducts] = useState<Product[]>([]);
  const [productsError, setProductsError] = useState<Error | null>(null);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [categoriesError, setCategoriesError] = useState<Error | null>(null);

  useEffect(() => {
    // setIsLoadingCategories(true);
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

  useEffect(() => {
    setIsLoadingProducts(true);
    fetch("http://localhost:8888/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setIsLoadingProducts(false);
      })
      .catch((err) => {
        setProductsError(err);
        setIsLoadingProducts(false);
      })
      .finally(() => {
        setIsLoadingProducts(false);
      });
  }, []);

  return (
    <>
      <ProductForm
        categories={categories}
        isLoadingCategories={isLoadingCategories}
        categoriesError={categoriesError}
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
        isLoadingProducts={isLoadingProducts}
        productsError={productsError}
        categories={categories}
        isLoadingCategories={isLoadingCategories}
        categoriesError={categoriesError}
      />
    </>
  );
}

export default App;
