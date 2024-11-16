import React, { useState } from "react";
import styles from "./createCategory.module.css";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const handleCreateCategory = async () => {
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch(`${apiUrl}/addCategory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Category added successfully!");
        setName(""); // Clear the input field after successful addition
      } else {
        setErrorMessage(data.error || "Failed to add category");
      }
    } catch (error) {
      setErrorMessage("Error adding category: " + error.message);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create Category</h2>
      <input
        type="text"
        placeholder="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={styles.input}
      />
      <button onClick={handleCreateCategory} className={styles.button}>
        Add Category
      </button>
      {successMessage && (
        <p className={styles.successMessage}>{successMessage}</p>
      )}
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
};

export default CreateCategory;
