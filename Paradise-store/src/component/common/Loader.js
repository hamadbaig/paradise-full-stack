import React from "react";
import styles from "./loader.module.css"; // Import the CSS module

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.rotatingCircle}></div>
      <img
        src="/Paradiselogo2.png"
        alt="Loading..."
        className={styles.loaderImage}
      />
    </div>
  );
};

export default Loader;
