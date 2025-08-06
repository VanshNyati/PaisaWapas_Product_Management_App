import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/products";

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(API_URL);
      // Sort products by price (low to high) by default
      const sortedData = data.sort((a, b) => a.price - b.price);
      setProducts(sortedData);
      setFiltered(sortedData);
    } catch (err) {
      console.error("Failed to fetch products", err);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product) => {
    try {
      await axios.post(API_URL, product);
      await fetchProducts();
    } catch (err) {
      console.error("Failed to add product", err);
      throw new Error("Failed to add product. Please try again.");
    }
  };

  const updateProduct = async (id, updatedProduct) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedProduct);
      await fetchProducts();
    } catch (err) {
      console.error("Failed to update product", err);
      throw new Error("Failed to update product. Please try again.");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      await fetchProducts();
    } catch (err) {
      console.error("Failed to delete product", err);
      throw new Error("Failed to delete product. Please try again.");
    }
  };

  const searchAndSort = (query, sortOrder) => {
    let filteredList = [...products];

    // Apply search filter
    if (query && query.trim()) {
      const searchTerm = query.toLowerCase().trim();
      filteredList = filteredList.filter((product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      );
    }

    // Apply sorting
    if (sortOrder === "asc") {
      filteredList.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filteredList.sort((a, b) => b.price - a.price);
    }

    setFiltered(filteredList);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products: filtered,
        loading,
        error,
        addProduct,
        updateProduct,
        deleteProduct,
        searchAndSort,
        refetch: fetchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
