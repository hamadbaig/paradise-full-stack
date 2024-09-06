"use client";
import styles from "./product.module.css";
import { IoMdStar } from "react-icons/io";
import React, { useState, useEffect, Suspense } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ProductCard from "@/component/products/ProductCard";
import AddOn from "@/component/common/AddOn";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { productApi } from "@/reduxToolKit/slice";
import ReactImageMagnify from "react-image-magnify";
import { useRouter, useSearchParams } from "next/navigation";
import { DatePicker, Radio, Button } from "antd";
import { IoArrowBack } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const Product = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedOption, setSelectedOption] = useState([]);
  const [isAddOnOpen, setIsAddOnOpen] = useState(false);
  const [mainImage, setMainImage] = useState("");
  const [IDproducts, setIDProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [shippingMethods, setShippingMethods] = useState([]);
  const [MethodTime, setMethodTime] = useState([]);
  // const [AddonItems, setAddonItems] = useState([]);
  const addonItems = [];
  const dispatch = useDispatch();
  const router = useRouter();
  const product = useSelector((state) => state.productApiData);

  const fetchProduct = async (ID) => {
    if (ID) {
      try {
        const response = await fetch(`${apiUrl}/getProductById`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId: ID }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        if (data.success) {
          setIDProducts(data.product);
          setMainImage(data.product.imageUrl);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      setError("No product ID provided");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
    }
  }, [productId]);

  useEffect(() => {
    dispatch(productApi());
  }, [dispatch]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!IDproducts) return <div>No product selected</div>;

  const handleProductClick = (product) => {
    router.push(`/product?id=${encodeURIComponent(product._id)}`);
  };

  const CartDispatch = () => {
    const cartItems = {
      name: IDproducts.name,
      price: IDproducts.price,
      imageUrl: IDproducts.imageUrl,
      imageUrl1: IDproducts.imageUrl1,
      imageUrl2: IDproducts.imageUrl2,
      city: selectedCity,
      date: selectedDate,
      time: selectedTime,
      method: selectedOption,
      cartItem: addonItems,
    };

    let currentCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    currentCartItems.push(cartItems);
    localStorage.setItem("cartItems", JSON.stringify(currentCartItems));
  };

  const handleImageClick = (newImage) => {
    setMainImage(newImage);
  };

  const isDisabled = !selectedDate;

  const handleSelectCity = (e) => {
    setSelectedCity(e.target.value);
    setSelectedDate("");
    setSelectedOption("");
    setSelectedTime("");
  };

  const handleCart = (event) => {
    event.preventDefault();
    setIsAddOnOpen(true);
  };

  const closeCart = (event) => {
    event.preventDefault();
    setIsAddOnOpen(false);
  };

  const handleClick = (e) => {
    e.preventDefault();
    CartDispatch();
    router.push("/");
  };

  const handleProceed = (e) => {
    e.preventDefault();
    CartDispatch();
    router.push("/cart");
  };
  const handleDateChange = (date, dateString) => {
    setSelectedDate(dateString);
    setStep(2);
    fetchShippingMethod();
  };

  const handleOpenClose = (status) => {
    setOpen(status);
  };

  // step 22

  const handleCancel = () => {
    setStep(1);
    setOpen(true);
  };

  const selectRadio = (method) => {
    setSelectedOption(method);
    fetchMethodTime(method);
    setStep(3);
  };
  const selectTime = (method) => {
    setSelectedTime(method.Time);
    setStep(4);
  };
  const cross = () => {
    setStep(1);
  };
  const back = () => {
    if (step === 3) {
      setStep(2);
    } else {
      setStep(1);
      setOpen(true);
    }
  };
  async function fetchShippingMethod() {
    try {
      const response = await fetch(`${apiUrl}/getShippingMethod`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Data fetched successfully:", data.Method);
      setShippingMethods(data.Method);
    } catch (error) {
      console.error("Failed to fetch shipping methods:", error);
    }
  }
  const fetchMethodTime = async (method) => {
    try {
      const response = await fetch(`${apiUrl}/getMethodTime`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ShippingMethod: [method._id],
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log("Time data:", data.time);
        setMethodTime(data.time);
        // You can handle the time data here, e.g., update state
      } else {
        console.error("Error fetching time data:", data.error);
      }
    } catch (error) {
      console.error("Internal Server Error:", error);
    }
  };
  const handleAddOnClick = (addonproduct) => {
    addonItems.push(addonproduct);
    alert("Addon product added");
  };
  return (
    <>
      <div className={styles.main}>
        <div className={styles.sliderImage}>
          {[
            IDproducts.imageUrl,
            IDproducts.imageUrl1,
            IDproducts.imageUrl2,
          ].map((img, index) => (
            <div key={index} onClick={() => handleImageClick(img)}>
              <img src={img} alt={IDproducts.name} />
            </div>
          ))}
        </div>
        <div className={styles.mainimg}>
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: "Main Product",
                isFluidWidth: true,
                src: mainImage,
              },
              largeImage: {
                src: mainImage,
                width: 900,
                height: 1000,
              },
              enlargedImageContainerDimensions: {
                width: "200%",
                height: "100%",
              },
            }}
          />
        </div>
        <div className={styles.nameprice}>
          <h2>{IDproducts.name}</h2>
          <div>
            <div className={styles.starreview}>
              <div className={styles.star}>
                5{" "}
                <span>
                  <IoMdStar className={styles.icon} />
                </span>
              </div>
              <div className={styles.review}>36 reviews</div>
            </div>
            <div className={styles.starreview}>
              <div className={styles.review2}>
                <div>{IDproducts.price}</div>
              </div>
            </div>
          </div>
          <form className={styles.form}>
            <div className={styles.inputdiv}>
              <select
                id="select"
                value={selectedCity}
                onChange={handleSelectCity}
                className={styles.label}
              >
                <option value="">Deliver To</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Oman">Oman</option>
                <option value="America">America</option>
              </select>
            </div>

            <div>
              {step === 1 && (
                <DatePicker
                  onChange={handleDateChange}
                  format="YYYY/MM/DD"
                  // className={styles.antDatePicker}
                  disabledDate={(current) => current && current < new Date()}
                  // dropdownClassName={styles.datePickerDropdown}
                  popupStyle={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000,
                  }}
                  open={open}
                  onOpenChange={handleOpenClose}
                />
              )}
              {step === 2 && (
                <div className={styles.method}>
                  <div className={styles.step2}>
                    <IoArrowBack
                      className={styles.icon}
                      onClick={() => back()}
                    />
                    <h2>Select Shipping Method</h2>
                    <RxCross2 className={styles.icon} onClick={() => cross()} />
                  </div>
                  <Radio.Group className={styles.radMain}>
                    {shippingMethods.map((method, index) => (
                      <Radio
                        className={styles.radioStyle}
                        value={method.price}
                        key={index}
                        onClick={() => selectRadio(method)}
                      >
                        {method.name}
                        <span className={styles.priceStyle}>
                          {" "}
                          AED {method.price}
                        </span>
                      </Radio>
                    ))}
                  </Radio.Group>
                  <div className={styles.calBtn}>
                    <Button type="default" onClick={handleCancel}>
                      Back to Calendar
                    </Button>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className={styles.method}>
                  <div className={styles.step2}>
                    <IoArrowBack
                      className={styles.icon}
                      onClick={() => back()}
                    />
                    <h2>Select TimeSlot</h2>
                    <RxCross2 className={styles.icon} onClick={() => cross()} />
                  </div>
                  <Radio.Group className={styles.radMain}>
                    {MethodTime.map((method, index) => (
                      <Radio
                        className={styles.radioStyle}
                        value={method.Time}
                        key={index}
                        onClick={() => selectTime(method)}
                      >
                        {method.Time}
                      </Radio>
                    ))}
                  </Radio.Group>
                  <div className={styles.calBtn}>
                    <Button type="default" onClick={handleCancel}>
                      Back to Calendar
                    </Button>
                  </div>
                </div>
              )}
              {step === 4 && (
                <div className={styles.inputdiv2} onClick={() => setStep(2)}>
                  <p>
                    {selectedDate} :{selectedOption.name}:{selectedOption.price}
                  </p>
                  <p>{selectedTime}</p>
                </div>
              )}
            </div>

            <div className={styles.tab2}>
              <div
                className={`${styles.add} ${styles.cat} ${
                  isDisabled ? styles.disabled : ""
                }`}
                onClick={isDisabled ? null : handleCart}
                style={isDisabled ? { pointerEvents: "none" } : {}}
              >
                Add to cart
              </div>
              {/* <Link
                className={`${styles.link} ${
                  isDisabled ? styles.disabled : ""
                }`}
                href={isDisabled ? "#" : "/cart"}
                scroll={false}
                style={isDisabled ? { pointerEvents: "none" } : {}}
              > */}
              <div
                className={`${styles.buy} ${styles.cat}`}
                onClick={isDisabled ? null : handleProceed}
              >
                Buy Now
              </div>

              {/* </Link> */}
            </div>
          </form>
          <div className="description">
            <h2>Description</h2>
            <div className="productdetails">
              <h3>Product Details</h3>
              <ul className={styles.para}>
                <li>3 Red rose</li>
                <li>3 Limonium</li>
                <li>6 Ruscus</li>
                <li>Beautifully Wrapped</li>
                <li>Chocolate Fudge Cake</li>
                <li>Weight: Half Kg</li>
                <li>Portions: 4</li>
              </ul>
            </div>
            <div className="deliveryinformation">
              <h3>Delivery Information</h3>
              <ul className={styles.para}>
                <li>
                  All orders are delivered via Ferns N Petals
                  temperature-controlled delivery vans.
                </li>
                <li>
                  Your cake will arrive beautifully fresh for your occasion. We
                  recommend that the cake(s) are stored in refrigerator before
                  consumption.
                </li>
                <li>
                  We recommend you to open the box upon handover and before
                  leaving of our delivery executive.
                </li>
              </ul>
            </div>
            <div className="deliveryinformation">
              <h3>Care Instructor</h3>
              <ul className={styles.para}>
                <li>Upon receiving the cake, refrigerate it immediately.</li>
                <li>
                  Fondant cakes should be stored in an air conditioned
                  environment before consumption.
                </li>
                <li>
                  Slice and serve the cake at room temperature and make sure it
                  is not exposed to heat.
                </li>
                <li>The cake should be consumed within 48 hours.</li>
                <li>Enjoy your cake!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.seller}>
        <div className={styles.heading2}>
          <h2>What others are Watching</h2>
        </div>
        <div className={styles.prodContainer}>
          <div className={styles.prod}>
            {product.map((product, index) => (
              <ProductCard
                key={index}
                name={product.name}
                price={product.price}
                imageUrl={product.imageUrl}
                onClick={() => handleProductClick(product)}
              />
            ))}
          </div>
        </div>
      </div>
      {/* <div className={styles.tab}>
        <div className={styles.add} onClick={handleCart}>
          Add To Cart
        </div>
        <div
                className={styles.buy}
                onClick={isDisabled ? null : handleProceed}
              >
                Buy Now
              </div>
      </div>
       */}

      {isAddOnOpen && (
        <>
          <div className={styles.backdrop} />
          <section className={styles.AddOn}>
            <div className={styles.top}>
              <h2>Add on something to make it extra special</h2>
              <FaTimes className={styles.icon} onClick={closeCart} />
            </div>

            <AddOn onSelectProduct={handleAddOnClick} />
            <div className={styles.bottom}>
              <h2>Bottom</h2>
              <a className={styles.link} scroll={false} onClick={handleClick}>
                <button className={styles.button2}>
                  {" "}
                  Continue Without Add On
                </button>
              </a>
            </div>
          </section>
        </>
      )}
    </>
  );
};

const WrappedProduct = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Product />
    </Suspense>
  );
};

export default WrappedProduct;
