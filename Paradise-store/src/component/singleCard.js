// import React from 'react';
// import styles from './singleCard.module.css';

// const singleCard = ({image,name,price,discount,delivery,reviews  }) => {
//   return (
//     <div className={styles.card}>
//       <img src={image} alt={name} className={styles.image} />
//       <div className={styles.details}>
//         <div className={styles.title}>{name}</div>
//         <div className={styles.price}>{price}</div>
//         <div className={styles.discount}>{discount}</div>
//         <div className={styles.delivery}>{delivery}</div>
//         <div className={styles.reviews}>{reviews} Reviews</div>
//       </div>
//     </div>
//   );
// };

// export default singleCard;
import styles from "../component/products/Home.module.css";
import Link from "next/link";
const singleCard = ({image,name,price,discount,delivery,reviews  }) => {
  return (
    <>
      <div className={styles.card}>
        <Link
          className={styles.link}
          href={{
            pathname: `/product`,
            // query: { name, price, imageUrl },
          }}
          scroll={false}
        >
          <div className={styles.cardpic}>
            <img src={image} className={styles.logoimg} />
          </div>
          <h3>{name}</h3>
          <h3 className={styles.price}>{price}</h3>
        </Link>
      </div>
    </>
  );
};
export default singleCard;
