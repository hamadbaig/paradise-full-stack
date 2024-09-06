import React from "react";
import styles from "./ProductTop.module.css";
function ProductTop() {
  return (
    <div className={styles.container}>
      <div className={styles.filters}></div>
      {/* <div className={styles.whatsapp}>
        <a href="https://wa.me/yourphonenumber" target="_blank" rel="noopener noreferrer">
          <img src="/path-to-whatsapp-icon.png" alt="WhatsApp" />
        </a>
      </div> */}
    </div>
  );
}

export default ProductTop;
