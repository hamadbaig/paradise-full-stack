"use client";
import React, { useEffect } from "react";
import ProductCard from "../products/ProductCard";
import styles from "./Commitment.module.css";
import { TiTick } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { productApi } from "@/reduxToolKit/slice";
import { useRouter, useSearchParams } from "next/navigation";

const Commitment = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productApi());
  }, []);
  const product = useSelector((state) => state.productApiData);
  const isLoading = useSelector((state) => state.isLoading);

  const error = useSelector((state) => state.error);

  const handleProductClick = (product) => {
    router.push(`/product?id=${encodeURIComponent(product._id)}`);
  };
  const viewAll = () => {
    // router.push(`/categorySearch`);
    router.push(`/categorySearch?category=${encodeURIComponent("")}`);
  };
  return (
    <>
      <div className={styles.commit}>
        <div>
          <span className={styles.circle}>
            <TiTick className={styles.icon} />
          </span>
          Delivering Emotions Since 1994
        </div>
        <div>
          <span className={styles.circle}>
            <TiTick className={styles.icon} />
          </span>
          We Deliver, On Time - Every Time!{" "}
        </div>
        <div>
          <span className={styles.circle}>
            <TiTick className={styles.icon} />
          </span>
          100% Secure Payment
        </div>
        <div>
          <span className={styles.circle}>
            <TiTick className={styles.icon} />
          </span>
          100% Smile Guaranteed{" "}
        </div>
      </div>
      <div className={styles.seller}>
        <div>
          <h2>Leading UAE Florist for Gift and Flower Delivery</h2>
          <p>
            10,000+ Flowers & Gifts at Your Command! With 24/7 Delivery and
            One-Hour Express Service, Surprise Them Anytime!
          </p>
        </div>
        <div className={styles.heading2}>
          <h2>Our Best Selling Product</h2>
          <div className={styles.cat} onClick={viewAll}>
            View All
          </div>
        </div>
        <div className={styles.prod}>
          {product.map((product, index) => (
            <ProductCard
              key={index}
              name={product.name}
              price={product.price}
              imageUrl={product.imageUrl}
              imageUrl2={product.imageUrl1}
              imageUrl3={product.imageUrl2}
              onClick={() => handleProductClick(product)}
            />
          ))}
        </div>
      </div>
      <div className={styles.seller}>
        <div>
          <h2>Leading UAE Florist for Gift and Flower Delivery</h2>
          <p>
            10,000+ Flowers & Gifts at Your Command! With 24/7 Delivery and
            One-Hour Express Service, Surprise Them Anytime!
          </p>
        </div>
        <div className={styles.heading2}>
          <h2>Jully special</h2>
          <div className={styles.cat} onClick={viewAll}>
            View All
          </div>
        </div>
        <div className={styles.prod}>
          {product.map((product, index) => (
            <ProductCard
              key={index}
              name={product.name}
              price={product.price}
              imageUrl={product.imageUrl}
              onClick={() => handleProductClick(product)}
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default Commitment;
