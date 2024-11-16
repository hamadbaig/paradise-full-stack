"use client";
import { useState, useEffect } from "react";
import ImageUpload from "@/component/common/ImageUpload";
import Image from "next/image";
import styles from "./createProducts.module.css";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const CreateProducts = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageUrl1, setImageUrl1] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    // Fetch categories on component mount
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${apiUrl}/getCategories`);
        const data = await response.json();
        setCategories(data.categories || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = async (event) => {
    const selectedCategoryId = event.target.value;
    setCategory(selectedCategoryId);
    try {
      const response = await fetch(`${apiUrl}/getSubCatByCategories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryId: [selectedCategoryId] }),
      });
      const data = await response.json();
      console.log("check:", data);
      setSubCategories(data.sub || []);
      setSubCategory(""); // Reset subcategory when category changes
    } catch (error) {
      console.error("Failed to fetch subcategories:", error);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Log all data before sending the POST request
    console.log("Submitting product data:", {
      name,
      price,
      description,
      category,
      SubCategory: subCategory,
      imageUrl,
      imageUrl1,
      imageUrl2,
    });

    try {
      const response = await fetch(`${apiUrl}/addProduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price,
          description,
          category,
          SubCategory: subCategory, // Using "SubCategory" to match backend expectations
          imageUrl,
          imageUrl1,
          imageUrl2,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Product added successfully!");
        // Reset form fields
        setName("");
        setPrice("");
        setDescription("");
        setCategory("");
        setSubCategory("");
        setImageUrl("");
        setImageUrl1("");
        setImageUrl2("");
      } else {
        console.log("Error response data:", data); // Log error data for further inspection
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

      <textarea
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Product Description"
        required
        className={styles.textarea}
      />

      <select
        name="category"
        value={category}
        onChange={handleCategoryChange}
        required
        className={styles.select}
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>

      <select
        name="subCategory"
        value={subCategory}
        onChange={(e) => setSubCategory(e.target.value)}
        required
        className={styles.select}
        disabled={!category} // Disable if no category is selected
      >
        <option value="">Select Subcategory</option>
        {subCategories.map((subCat) => (
          <option key={subCat._id} value={subCat._id}>
            {subCat.name}
          </option>
        ))}
      </select>

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

export default CreateProducts;
