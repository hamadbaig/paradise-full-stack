import styles from "./Home.module.css";
import Link from "next/link";
const ProductCard = ({
  name,
  price,
  imageUrl,
  imageUrl2,
  imageUrl3,
  onClick,
}) => {
  return (
    <>
      <div className={`${styles.card} ${styles.cat}`} onClick={onClick}>
        <div className={styles.cardpic}>
          <img src={imageUrl} className={styles.logoimg} />
        </div>
        <h3>{name}</h3>
        <h3 className={styles.price}>{price}</h3>
      </div>
    </>
  );
};
export default ProductCard;
