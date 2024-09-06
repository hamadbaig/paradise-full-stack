"use client";
import { useState, useEffect } from "react";
import styles from "./AddOnCard.module.css";

// const AddOnCard = ({ name, price, imageUrl2, imageUrl3, onSelectProduct }) => {
const AddOnCard = ({ product, onSelectProduct }) => {
  const images = [product.imageUrl2, product.imageUrl1];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [images.length]);
  const handleClick = (product) => {
    onSelectProduct(product);
  };
  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardpic}>
          <img
            src={images[currentImageIndex]}
            className={styles.logoimg}
            alt={product.name}
          />
        </div>
        <h3>{product.name}</h3>
        <h3 className={styles.price}>{product.price}</h3>
        <div className={styles.btnDiv}>
          <button
            className={styles.button}
            onClick={() => handleClick(product)}
          >
            + ADD
          </button>
        </div>
      </div>
    </>
  );
};

export default AddOnCard;
