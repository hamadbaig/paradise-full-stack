"use client";
import styles from "./cart.module.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const StripeCheckout = ({ totalPrice, addOrder }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const amountInFils = totalPrice * 100;
    const response = await fetch(`${apiUrl}/createPaymentIntent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: amountInFils, currency: "AED" }),
    });

    const { clientSecret } = await response.json();

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      console.error("Stripe error:", error.message);
    } else if (paymentIntent.status === "succeeded") {
      addOrder();

      alert("Payment successful!");
    } else {
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <CardElement className={styles.cardElement} />
      <button type="submit" disabled={!stripe} className={styles.submitButton}>
        Pay with Stripe
      </button>
    </form>
  );
};
const Cart = () => {
  const [Data, setData] = useState([]);
  const [totalProductPrice, setTotalProductPrice] = useState(0);
  const [totalShippingPrice, setTotalShippingPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedAddresses, setSelectedAddresses] = useState({});
  const [apiData, setApiData] = useState([]);
  const [Step, setStep] = useState(0);
  const [pay, setpay] = useState(0);
  const [userId, setuserId] = useState("");

  const handlePayWithTap = () => {
    // Check if all products in the Data array have an address assigned
    const allProductsHaveAddress = Data.every(
      (product) => product.address && product.address.length > 0
    );

    if (allProductsHaveAddress) {
      setStep(1); // Proceed only if all products have an address
    } else {
      alert("Please ensure all products have a delivery address assigned.");
    }
  };
  const allProductsHaveAddress = Data.every(
    (product) => product.address && product.address.length > 0
  );
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (!auth) {
      router.push(`/Login`);
    } else {
      const user = JSON.parse(localStorage.getItem("user"));
      const log = user && user._id;
      setuserId(log);
    }
  }, [router]);

  useEffect(() => {
    const currentCartItems =
      JSON.parse(localStorage.getItem("cartItems")) || [];
    setData(currentCartItems);
  }, []);

  const handleRemove = (index) => {
    const newData = Data.filter((_, i) => i !== index);
    setData(newData);
    localStorage.setItem("cartItems", JSON.stringify(newData));
  };
  const handleRemoveaddOn = (productIndex, subIndex) => {
    const updatedData = Data.map((product, i) => {
      if (i === productIndex) {
        const updatedCartItems = product.cartItem.filter(
          (_, j) => j !== subIndex
        );
        return {
          ...product,
          cartItem: updatedCartItems,
        };
      }
      return product;
    });
    setData(updatedData);
    localStorage.setItem("cartItems", JSON.stringify(updatedData));
  };

  useEffect(() => {
    const productTotal = Data.reduce((total, item) => {
      const price = parseFloat(item.price.replace("AED ", ""));
      const cartItemTotal =
        item.cartItem?.reduce((subTotal, subItem) => {
          const subItemPrice = parseFloat(subItem.price.replace("AED ", ""));
          return subTotal + subItemPrice;
        }, 0) || 0;
      return total + price + cartItemTotal;
    }, 0);
    setTotalProductPrice(productTotal);

    const shippingTotal = Data.reduce((total, item) => {
      const price = parseFloat(item.method.price.replace("AED ", ""));
      return total + price;
    }, 0);
    setTotalShippingPrice(shippingTotal);

    setTotalPrice(productTotal + shippingTotal);
  }, [Data]);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!userId) {
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(`${apiUrl}/getUserById`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: userId }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setApiData(data.user);
        setAddresses(data.user.addresses || []);
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("Failed to fetch user data");
      }
    };

    fetchUser();
  }, [userId]);

  const toggleAddressForm = () => {
    setShowAddressForm(!showAddressForm);
  };

  const handleAddressSelect = (productIndex, addressIndex) => {
    const selectedAddress = addresses[addressIndex];

    if (!Data[productIndex].address) {
      Data[productIndex].address = [];
    }

    Data[productIndex].address[0] = selectedAddress;

    setData([...Data]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value.trim(),
      city: e.target.city.value.trim(),
      address: e.target.address.value.trim(),
      landmark: e.target.landmark.value.trim(),
      mobile: e.target.mobile.value.trim(),
      addressType: e.target.addressType.value.trim(),
    };

    // Check if any field is empty
    for (const field in formData) {
      if (!formData[field]) {
        alert(`Cannot proceed. Field "${field}" is empty.`);
        return; // Stop execution if any field is empty
      }
    }

    // If addresses exist, add to the local state
    if (addresses && addresses.length > 0) {
      setAddresses((prevAddresses) => [...prevAddresses, formData]);
      setShowAddressForm(false);
      // alert("Address added successfully without API call.");
    } else {
      // Otherwise, call the API
      try {
        const response = await fetch(`${apiUrl}/addAddress`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            userId: userId,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          setApiData(result);
          setAddresses((prevAddresses) => [...prevAddresses, formData]);
          setShowAddressForm(false);
          console.log("API Response: added successfully");
          // alert("Address added successfully.");
        } else {
          const result = await response.json();
          console.error("Error:", result.error);
        }
      } catch (error) {
        console.error("Error submitting the form:", error);
      }
    }
  };

  const payMethod = (num) => {
    setpay(num);
  };

  const addOrder = async () => {
    // Check if the address for the first product is empty
    if (!Data[0].address || Data[0].address === "") {
      alert("Address is not selected.");
      return; // Stop execution if address is missing
    }

    try {
      const response = await fetch(`${apiUrl}/addOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Data,
          userId,
          totalPrice,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        const orderId = result.order?._id; // Get the order ID
        const totalQuantity = Data.reduce((acc, product) => {
          return acc + 1 + (product.cartItem ? product.cartItem.length : 0); // Main item + add-on items
        }, 0); // Calculate total quantity

        console.log("Orders added successfully:", result.order);

        // Display order summary in the alert
        alert(
          `Order placed successfully.\nOrder ID: ${orderId}\nQuantity: ${totalQuantity}\nTotal Price: ${totalPrice}`
        );

        clearCartItems(); // Clear the cart
        router.push(`/`); // Redirect to homepage or desired route
      } else {
        console.error("Failed to add orders:", result.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const clearCartItems = () => {
    localStorage.removeItem("cartItems");
    console.log("Cart items cleared");
  };
  const handleApprove = (orderID) => {
    console.log("Order approved!", orderID);
    addOrder();
  };

  const handlePayPalError = (err) => {
    console.error("PayPal Checkout error: ", err);
    alert("Payment failed. Please try again.");
  };
  return (
    <>
      <div className={styles.CartMain}>
        <div className={styles.overflow}>
          {Data.map((product, productIndex) => (
            <div key={productIndex}>
              <h2 className={styles.gift}>Gift {productIndex + 1}</h2>
              <div className={styles.CartMain2}>
                <div className={styles.cartImage}>
                  <img src={product.imageUrl} alt={product.name} />
                  <div
                    onClick={() => handleRemove(productIndex)}
                    className={styles.delete}
                  >
                    Delete
                  </div>
                </div>
                <div>
                  <div>{product.name}</div>
                  <div>
                    {product.price} {"  "}
                  </div>
                  <div>
                    <div className={styles.deliver}> QTY : 1</div>
                    <div>Delivery ON:</div>
                    <div className={styles.deliver}>
                      {product.time} | {product.date} | {product.method.name}
                    </div>
                  </div>
                </div>
                <div className={styles.change}>Change </div>
              </div>
              {product.cartItem && product.cartItem.length > 0 ? (
                <h2 className={styles.gift}>Add On Items</h2>
              ) : null}

              {product.cartItem.length > 0 &&
                product.cartItem.map((subProduct, subIndex) => (
                  <>
                    <div className={styles.CartMain3} key={subIndex}>
                      <div className={styles.cartImage}>
                        <img src={subProduct.imageUrl} alt={subProduct.name} />
                        <div
                          onClick={() =>
                            handleRemoveaddOn(productIndex, subIndex)
                          }
                          className={styles.delete}
                        >
                          Delete
                        </div>
                      </div>
                      <div>
                        <div>{subProduct.name}</div>
                        <div>
                          {subProduct.price} {"  "}
                        </div>
                        <div>
                          <div className={styles.deliver}> QTY : 1</div>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              <div className={styles.CartMain2} onClick={toggleAddressForm}>
                + Add New Address
              </div>
              {showAddressForm && (
                <div className={styles.formContainer}>
                  <h2>Add New Address</h2>
                  <form onSubmit={handleSubmit}>
                    <div className={styles.addflex}>
                      <div className={styles.formGroup}>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" />
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="city">Recipient's City</label>
                        <input type="text" id="city" name="city" />
                      </div>
                    </div>
                    <div className={styles.addflex}>
                      <div className={styles.formGroup}>
                        <label htmlFor="address">Recipient's Address</label>
                        <input type="text" id="address" name="address" />
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="landmark">Landmark</label>
                        <input type="text" id="landmark" name="landmark" />
                      </div>
                    </div>
                    <div className={styles.addflex}>
                      <div className={styles.formGroup}>
                        <label htmlFor="mobile">Recipient's Mobile</label>
                        <input type="text" id="mobile" name="mobile" />
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="email">
                          Recipient's Email (optional)
                        </label>
                        <input type="email" id="email" name="email" />
                      </div>
                    </div>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="addressType"
                        value="home"
                        defaultChecked
                      />{" "}
                      Home
                    </label>
                    <label className={styles.radioLabel}>
                      <input type="radio" name="addressType" value="office" />{" "}
                      Office
                    </label>
                    <label className={styles.radioLabel}>
                      <input type="radio" name="addressType" value="other" />{" "}
                      Other
                    </label>
                    <div>
                      <button type="submit" className={styles.submitButton}>
                        Save and Deliver Here
                      </button>
                    </div>
                  </form>
                </div>
              )}
              {addresses.length > 0 && (
                <div>
                  <h2>Select Delivery Address</h2>
                  {addresses.map((address, index) => (
                    <div key={index} className={styles.address}>
                      <div className={styles.flex}>
                        <input
                          type="radio"
                          name={`selectedAddress-${productIndex}`}
                          value={index}
                          checked={selectedAddresses[index]}
                          onClick={() =>
                            handleAddressSelect(productIndex, index)
                          }
                        />

                        <p>{address.name}</p>
                        <p>{address.mobile}</p>
                      </div>
                      <div className={styles.flex}>
                        <p>{address.address}</p>
                        <p>{address.city}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          {allProductsHaveAddress && (
            <div className={styles.placeorder}>
              <h2>Place Order</h2>
              <button
                className={styles.submitButton}
                onClick={handlePayWithTap}
              >
                select payment method
              </button>
            </div>
          )}
          {Step === 1 && (
            <div className={styles.paymentOptions}>
              <div className={styles.optionsTitle}>PAYMENT OPTIONS</div>
              <div className={styles.option}>
                <text onClick={() => payMethod(1)}>Credit/Debit Card</text>
                {pay === 1 && (
                  <div className={styles.cod2}>
                    <Elements stripe={stripePromise}>
                      <StripeCheckout
                        totalPrice={totalPrice}
                        addOrder={addOrder}
                      />
                    </Elements>
                  </div>
                )}
              </div>

              <div className={styles.option}>
                <text onClick={() => payMethod(2)}>Tabby</text>
                {pay === 2 && (
                  <div className={styles.cod}>
                    <p>tabby</p>
                  </div>
                )}
              </div>
              <div className={styles.option}>
                <text onClick={() => payMethod(3)}>PayPal</text>
                {pay === 3 && (
                  <div className={styles.cod}>
                    <PayPalScriptProvider
                      options={{
                        "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                      }}
                    >
                      <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                  value: totalPrice.toFixed(2),
                                },
                              },
                            ],
                          });
                        }}
                        onApprove={(data, actions) => {
                          return actions.order.capture().then((details) => {
                            const name = details.payer.name.given_name;
                            alert(`Transaction completed by ${name}`);
                            handleApprove(data.orderID);
                          });
                        }}
                        onError={(err) => handlePayPalError(err)}
                      />
                    </PayPalScriptProvider>
                  </div>
                )}
              </div>
              <div className={styles.option}>
                <text onClick={() => payMethod(4)}>Cash On Delivery</text>

                {pay === 4 && (
                  <>
                    <div className={styles.cod}>
                      <p>cash on delivery </p>
                    </div>
                    <button className={styles.submitButton} onClick={addOrder}>
                      Pay AED {totalPrice}
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        <div className={styles.calculator}>
          <div className={styles.cartprice}>
            <h2>Price Details</h2>
            <hr />
            <div className={styles.flex}>
              <h3>Price: </h3>
              <p>{totalProductPrice} AED</p>
            </div>
            <div className={styles.flex}>
              <h3>Delivery Charges: </h3>
              <p>{totalShippingPrice} AED</p>
            </div>
            <hr />
            <div className={styles.flex}>
              <h3>Total: </h3>
              <p>{totalPrice} AED</p>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
