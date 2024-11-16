"use client";

import React, { useEffect, useState, Suspense } from "react";
import ImageUpload from "@/component/common/ImageUpload";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "@/component/products/createProducts.module.css";

const UpdateProductContent = () => {
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

        {/* Image Upload and Preview Fields */}
        {[
          { label: "Main Image", value: imageUrl, setValue: setImageUrl },
          {
            label: "Additional Image 1",
            value: imageUrl1,
            setValue: setImageUrl1,
          },
          {
            label: "Additional Image 2",
            value: imageUrl2,
            setValue: setImageUrl2,
          },
        ].map((img, index) => (
          <div className={styles.imageField} key={index}>
            <input
              type="text"
              name={img.label.toLowerCase().replace(" ", "")}
              value={img.value}
              onChange={(e) => img.setValue(e.target.value)}
              className={styles.input}
              placeholder={`${img.label} URL`}
            />
            <ImageUpload onImageUpload={(url) => img.setValue(url)} />
            {img.value && (
              <Image
                src={img.value}
                alt={`${img.label}`}
                width={50}
                height={50}
                className={styles.imagePreview}
              />
            )}
          </div>
        ))}

        <button type="button" onClick={handleUpdate} className={styles.button}>
          Update Product
        </button>
      </form>
    </div>
  );
};

const UpdateProduct = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <UpdateProductContent />
    </Suspense>
  );
};

export default UpdateProduct;
