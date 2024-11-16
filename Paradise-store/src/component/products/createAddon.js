"use client";
import { useState, useEffect } from "react";
import ImageUpload from "@/component/common/ImageUpload";
import Image from "next/image";
import styles from "./createProducts.module.css";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const CreateAddon = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageUrl1, setImageUrl1] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Submitting product data:", {
      name,
      price,
      imageUrl,
      imageUrl1,
      imageUrl2,
    });

    try {
      const response = await fetch(`${apiUrl}/addAddOn`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price,
          imageUrl,
          imageUrl1,
          imageUrl2,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Product added successfully!");
        setName("");
        setPrice("");
        setImageUrl("");
        setImageUrl1("");
        setImageUrl2("");
      } else {
        console.log("Error response data:", data);
        alert(data.message || "Failed to add product");
      }
    } catch (error) {
      console.error("Error during product submission:", error);
      alert("Failed to add product");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin Panel - Add Product</h1>

      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product Name"
        required
        className={styles.input}
      />

      <input
        type="text"
        name="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Product Price"
        required
        className={styles.input}
      />

      <ImageUpload onImageUpload={(url) => setImageUrl(url)} />
      <ImageUpload onImageUpload={(url) => setImageUrl1(url)} />
      <ImageUpload onImageUpload={(url) => setImageUrl2(url)} />

      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Main Image"
          width={50}
          height={50}
          className={styles.imagePreview}
        />
      )}
      {imageUrl1 && (
        <Image
          src={imageUrl1}
          alt="Additional Image 1"
          width={50}
          height={50}
          className={styles.imagePreview}
        />
      )}
      {imageUrl2 && (
        <Image
          src={imageUrl2}
          alt="Additional Image 2"
          width={50}
          height={50}
          className={styles.imagePreview}
        />
      )}

      <button type="submit" onClick={handleSubmit} className={styles.button}>
        Add Product
      </button>
    </div>
  );
};

export default CreateAddon;
