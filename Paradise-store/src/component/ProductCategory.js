"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "./products/ProductCard";
import styles from "./ProductMid.module.css";
import { useRouter } from "next/navigation";

const ProductCategory = ({ cat, sub }) => {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      if (!apiUrl) {
        console.error("API URL is not defined");
        return;
      }

      try {
        // Construct the body conditionally
        const requestBody = {
          ...(cat && { categoryId: [cat] }),
          ...(sub && { subCategoryId: [sub] }),
        };

        const options = {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify(requestBody),
        };

        const response = await fetch(
          `${apiUrl}/getProductsByCategoryAndSubCategory`,
          options
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setProducts(data.products);
        console.log(data, "Fetched Products");
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (cat !== null || sub !== null) {
      fetchProducts();
    }
  }, [cat, sub, apiUrl]);

  const handleSortChange = (e) => {
    const value = e.target.value;

    const sortedProducts = [...products].sort((a, b) => {
      const priceA = parseFloat(a.price.replace("AED ", ""));
      const priceB = parseFloat(b.price.replace("AED ", ""));

      if (value === "High To Low") {
        return priceB - priceA;
      } else if (value === "Low To High") {
        return priceA - priceB;
      }
      return 0;
    });

    setProducts(sortedProducts);
    setSortOrder(value);
  };

  const handleProductClick = (product) => {
    router.push(`/product?id=${encodeURIComponent(product._id)}`);
  };
  const goToHome = () => {
    router.push(`/`);
  };
  return (
    <div className={styles.container}>
      <h1>Flower Shop</h1>
      <div className={styles.breadcrumb} onClick={() => goToHome()}>
        Home › Flower Delivery Dubai
      </div>
      {/* <div className={styles.reviews}>
        <span>4.9</span>
        <a href="#reviews">7704 Reviews</a>
      </div> */}
      <div className={styles.filters}>
        <div className={styles.filterOptions}>
          <select>
            <option>Gift Type</option>
          </select>
          <select onChange={handleSortChange} value={sortOrder}>
            <option>Price</option>
            <option value="High To Low">High To Low</option>
            <option value="Low To High">Low To High</option>
          </select>
          <select>
            <option>Sort By</option>
            <option>Recommended</option>
          </select>
        </div>
      </div>
      <div className={styles.productList}>
        {products.map((product, index) => (
          <ProductCard
            key={index}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
            imageUrl2={product.imageUrl2}
            imageUrl3={product.imageUrl3}
            onClick={() => handleProductClick(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCategory;
