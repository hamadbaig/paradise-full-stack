"use client";
import React, { useEffect, useState } from "react";
import styles from "./AddsOn.module.css";
import AddOnCard from "./AddOnCard";

const AddOn = ({ onSelectProduct }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}/getAddOn`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data.addOn || []); // Adjust if needed based on your API response
        console.log(products, "add on products");
      } catch (error) {
        console.error("Error fetching add-ons:", error);
        setError(error.message);
      } finally {
        setLoading(false); // Update loading state
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!products) return <p>Loading api data... {error}</p>;
  const handleProductSelect = (product) => {
    onSelectProduct(product);
    console.log(product, "toooooo");
  };
  return (
    <>
      <div className={styles.Card}>
        {products.map((product, index) => (
          <AddOnCard
            key={index}
            product={product}
            onSelectProduct={() => handleProductSelect(product)}
          />
        ))}
      </div>
    </>
  );
};

export default AddOn;
