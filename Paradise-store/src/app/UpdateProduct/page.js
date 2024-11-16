"use client";
import React, { useEffect, useState } from "react";
import ImageUpload from "@/component/common/ImageUpload";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "@/component/products/createProducts.module.css";

const UpdateProduct = () => {
  const searchParams = useSearchParams();
  const Id = searchParams.get("id");
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [SubCategory, setSubCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageUrl1, setImageUrl1] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product data by ID
  useEffect(() => {
    if (!Id) {
      setError("Product ID not provided.");
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`${apiUrl}/getProductById`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: Id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const product = data.product;
          setName(product.name || "");
          setPrice(product.price || "");
          setDescription(product.description || "");
          setCategory(product.category || "");
          setSubCategory(product.SubCategory || "");
          setImageUrl(product.imageUrl || "");
          setImageUrl1(product.imageUrl1 || "");
          setImageUrl2(product.imageUrl2 || "");
        } else {
          setError("Product not found.");
        }
      })
      .catch((error) => setError("Error fetching product: " + error))
      .finally(() => setLoading(false));
  }, [Id, apiUrl]);

  const handleUpdate = () => {
    fetch(`${apiUrl}/UpdateProductById/${Id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        updateData: {
          name,
          price,
          description,
          category,
          SubCategory,
          imageUrl,
          imageUrl1,
          imageUrl2,
        },
      }),
    })
      .then((res) => res.json())
      .then(() => {
        router.push("/AdminPanel@123");
      })
      .catch((error) => setError("Error updating product: " + error));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.updateContainer}>
      <h2 className={styles.title}>Update Product</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={(e) => e.preventDefault()} className={styles.updateForm}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
          placeholder="Product Name"
        />

        <input
          type="text"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className={styles.input}
          placeholder="Product Price"
        />

        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textarea}
          placeholder="Product Description"
        />

        <input
          type="text"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={styles.input}
          placeholder="Product Category"
        />

        <input
          type="text"
          name="subcategory"
          value={SubCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          className={styles.input}
          placeholder="Product Subcategory"
        />

        {/* Main Image URL with Upload and Preview */}
        <div className={styles.imageField}>
          <input
            type="text"
            name="mainImageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className={styles.input}
            placeholder="Main Image URL"
          />
          <ImageUpload onImageUpload={(url) => setImageUrl(url)} />
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="Main Image"
              width={50}
              height={50}
              className={styles.imagePreview}
            />
          )}
        </div>

        {/* Additional Image 1 URL with Upload and Preview */}
        <div className={styles.imageField}>
          <input
            type="text"
            name="imageUrl1"
            value={imageUrl1}
            onChange={(e) => setImageUrl1(e.target.value)}
            className={styles.input}
            placeholder="Additional Image 1 URL"
          />
          <ImageUpload onImageUpload={(url) => setImageUrl1(url)} />
          {imageUrl1 && (
            <Image
              src={imageUrl1}
              alt="Additional Image 1"
              width={50}
              height={50}
              className={styles.imagePreview}
            />
          )}
        </div>

        {/* Additional Image 2 URL with Upload and Preview */}
        <div className={styles.imageField}>
          <input
            type="text"
            name="imageUrl2"
            value={imageUrl2}
            onChange={(e) => setImageUrl2(e.target.value)}
            className={styles.input}
            placeholder="Additional Image 2 URL"
          />
          <ImageUpload onImageUpload={(url) => setImageUrl2(url)} />
          {imageUrl2 && (
            <Image
              src={imageUrl2}
              alt="Additional Image 2"
              width={50}
              height={50}
              className={styles.imagePreview}
            />
          )}
        </div>

        <button type="button" onClick={handleUpdate} className={styles.button}>
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
