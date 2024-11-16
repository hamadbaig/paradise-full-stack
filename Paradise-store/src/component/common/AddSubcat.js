import React, { useEffect, useState } from "react";
import styles from "./createSubcategory.module.css";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const CreateSubCategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch categories on component mount
  useEffect(() => {
    fetch(`${apiUrl}/getCategories`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCategories(data.categories);
        } else {
          setErrorMessage("Failed to load categories");
        }
      })
      .catch((error) =>
        setErrorMessage("Error fetching categories: " + error.message)
      );
  }, []);

  const handleCreateSubCategory = async () => {
    setSuccessMessage("");
    setErrorMessage("");

    if (!selectedCategory) {
      setErrorMessage("Please select a category");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/addSubCategory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: subCategoryName,
          category: selectedCategory,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Subcategory added successfully!");
        setSubCategoryName("");
        setSelectedCategory("");
      } else {
        setErrorMessage(data.error || "Failed to add subcategory");
      }
    } catch (error) {
      setErrorMessage("Error adding subcategory: " + error.message);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create Subcategory</h2>

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className={styles.select}
      >
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Subcategory Name"
        value={subCategoryName}
        onChange={(e) => setSubCategoryName(e.target.value)}
        className={styles.input}
      />

      <button onClick={handleCreateSubCategory} className={styles.button}>
        Add Subcategory
      </button>

      {successMessage && (
        <p className={styles.successMessage}>{successMessage}</p>
      )}
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
};

export default CreateSubCategory;
