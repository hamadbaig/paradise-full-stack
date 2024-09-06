import React from "react";
import styles from "./Footer.module.css";
const Footer = () => {
  return (
    <>
      <div className={styles.Footer}>
        <div className={styles.Footermain}>
          <div className={styles.signupcontainer}>
            <p className={styles.signuptitle}>
              SIGN UP FOR EMAIL OFFERS & UPDATES
            </p>
            <form className={styles.signupform}>
              <div className={styles.inputcontainer}>
                <input
                  type="email"
                  placeholder="Email"
                  className={styles.emailinput}
                />
              </div>
              <button type="submit" className={styles.submitbutton}>
                SUBMIT
              </button>
            </form>
          </div>
          <div className={styles.signupcontainer}>
            <p className={styles.signuptitle}>CONNECT WITH US </p>
            <div className={styles.connect}>
              <img
                className={styles.ftlogo2}
                src="/fb.png"
                alt="facebook"
              ></img>
              <img
                className={styles.ftlogo2}
                src="/insta.png"
                alt="instagram"
              ></img>
              <img
                className={styles.ftlogo2}
                src="/ln.png"
                alt="linkedin"
              ></img>
              <img className={styles.ftlogo2} src="/yt.png" alt="youtube"></img>
            </div>
          </div>
          <div className={styles.signupcontainer}>
            <p className={styles.signuptitle}>SECURE ORDERING & TRANSACTIONS</p>
            <div className={styles.connect}>
              <img className={styles.ftlogo} src="/visa.jpg" alt="visa"></img>
              {/* <img className={styles.ftlogo} src="/rupay.jpg" alt="rupay"></img> */}
              <img
                className={styles.ftlogo}
                src="/paypal.jpg"
                alt="paypal"
              ></img>
              <img
                className={styles.ftlogo}
                src="/mastercard.jpg"
                alt="mastercard"
              ></img>
            </div>
          </div>
        </div>
        <div className={styles.Footersecond}>
          <div className={styles.cat}>Anniversery </div>
          <div className={styles.cat}>Anniversery </div>
          <div className={styles.cat}>Birthday</div>
          <div className={styles.cat}>Flowers</div>
          <div className={styles.cat}>Cake</div>
          <div className={styles.cat}>Personalised</div>
          <div className={styles.cat}>Hamper</div>
          <div className={styles.cat}>More Gift</div>
          <div className={styles.cat}>Brands</div>
          <div className={styles.cat}>Ocassion</div>
          <div className={styles.cat}>Global</div>
          <div className={styles.cat}>Hamper</div>
          <div className={styles.cat}>More Gift</div>
          <div className={styles.cat}>Brands</div>
          <div className={styles.cat}>Ocassion</div>
          <div className={styles.cat}>Global</div>
        </div>
        <p className={styles.signuptitle}>
          Copyright © 2024 www.paradise.com.All rights reserved
        </p>
      </div>
    </>
  );
};
export default Footer;
