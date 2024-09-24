"use client";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCartShopping } from "react-icons/fa6";
import { MdCardGiftcard } from "react-icons/md";
import { IoIosCall, IoMdContact, IoMdHelpCircleOutline } from "react-icons/io";
import { MdOutlineCorporateFare } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { CategoryApi } from "@/reduxToolKit/slice";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "./Loader";
const Header = () => {
  const [Data, setData] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const Categories = useSelector((state) => state.categoryApiData);

  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isContentVisible2, setIsContentVisible2] = useState(false);
  const [query, setQuery] = useState("");
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const [loading, setLoading] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    dispatch(CategoryApi());
  }, [dispatch]);
  useEffect(() => {
    const currentCartItems =
      JSON.parse(localStorage.getItem("cartItems")) || [];
    setData(currentCartItems);
  }, []);
  useEffect(() => {
    // Check if window and router are available (to avoid SSR issues)
    if (typeof window !== "undefined" && router.events) {
      // Start loader when the route starts to change
      const handleStart = () => setLoading(true);
      // Stop loader when the route completes or an error occurs
      const handleComplete = () => setLoading(false);

      // Subscribe to router events
      router.events.on("routeChangeStart", handleStart);
      router.events.on("routeChangeComplete", handleComplete);
      router.events.on("routeChangeError", handleComplete);

      // Cleanup on unmount
      return () => {
        router.events.off("routeChangeStart", handleStart);
        router.events.off("routeChangeComplete", handleComplete);
        router.events.off("routeChangeError", handleComplete);
      };
    }
  }, [router]);
  const handleMouseEnter = (categoryId) => {
    setHoveredCategory(categoryId);
    fetchSubCategories(categoryId);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
    setSubCategories([]);
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    // alert("You searched for: " + query);
    setLoading(true);

    router.push(`/singleCategory?query=${encodeURIComponent(query)}`);

    // You can add your search logic here
  };
  const categoryFind = (category) => () => {
    router.push(`/categorySearch?category=${encodeURIComponent(category._id)}`);
  };
  const subCategoryFind = (cat, sub) => (event) => {
    event.stopPropagation();

    router.push(
      `/categorySearch?category=${encodeURIComponent(
        cat._id
      )}&subcategory=${encodeURIComponent(sub._id)}`
    );
  };

  const handleToggle = () => {
    setIsContentVisible(!isContentVisible);
  };

  const handleToggle2 = () => {
    setIsContentVisible2(!isContentVisible2);
  };
  const goToCart = () => {
    router.push(`/cart`);
  };
  const goToHome = () => {
    setLoading(true);
    router.push(`/`);
  };
  const fetchSubCategories = async (categoryId) => {
    try {
      const response = await fetch(`${apiUrl}/getSubCatByCategories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryId: [categoryId] }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch subcategories");
      }

      const data = await response.json();
      setSubCategories(data.sub || []);
    } catch (error) {
      console.error("Failed to fetch subcategories:", error);
    }
  };
  return (
    <>
      <div className={styles.topbaar}>
        <div className={styles.cat}>
          <text>AED</text>
        </div>
        <div className={styles.cat}>
          <text>Call Us +971 43387676</text>
        </div>
        <div className={styles.cat}>
          <text>العربية</text>
        </div>
      </div>
      <div className={styles.header}>
        <div className={styles.logo}>
          <div
            className={`${styles.logoDiv} ${styles.cat}`}
            onClick={() => goToHome()}
          >
            <img src="/Paradiselogo2.png" className={styles.logoimg} />
          </div>
          <div className={styles.searchContainer2}>
            <input
              type="text"
              id="searchInput"
              className={styles.searchInput}
              placeholder="Search flowers, cakes, gifts etc."
              value={query}
              onChange={handleInputChange}
            />
            <button
              className={`${styles.searchButton} ${styles.cat}`}
              onClick={handleSearch}
            >
              <FaSearch className={styles.searchIcon} />
            </button>
          </div>
        </div>
        <div className={styles.searchContainer}>
          <input
            type="text"
            id="searchInput"
            className={styles.searchInput}
            placeholder="Search flowers, cakes, gifts etc."
            value={query}
            onChange={handleInputChange}
          />
          <button className={styles.searchButton} onClick={handleSearch}>
            <FaSearch className={styles.searchIcon} />
          </button>
        </div>
        <div className={styles.multitimes2}>
          <div className={styles.cat}>
            <IoMdHelpCircleOutline className={styles.icon} />
            <text>Help</text>
          </div>
          <div className={styles.cat}>
            <MdOutlineCorporateFare className={styles.icon} />
            <text>Corporate</text>
          </div>
          <div onClick={() => goToCart()} className={styles.cat}>
            {Data.length > 0 && (
              <span className={styles.num}>{Data.length}</span>
            )}{" "}
            <FaCartShopping className={styles.icon} />
            <text>Cart</text>
          </div>
          <div className={styles.cat}>
            <IoMdContact className={styles.icon} />
            <text>Account</text>
          </div>
        </div>
        <div className={styles.toggleicon}>
          <div className={styles.times}>
            {isContentVisible ? (
              <FaTimes className={styles.icon} onClick={handleToggle} />
            ) : (
              <FaBars className={styles.icon} onClick={handleToggle} />
            )}
            <div className={`${styles.multitimes} ${styles.cat}`}>
              <FaSearch className={styles.icon} />
              <MdCardGiftcard className={styles.icon} />
              <FaCartShopping className={styles.icon} />
              <BsThreeDotsVertical
                className={styles.icon}
                onClick={handleToggle2}
              />
            </div>
          </div>
        </div>
        {isContentVisible2 && (
          <div className={styles.contentdiv}>
            <div className={styles.drawer}>
              <a className={styles.options} href="/">
                HOME
              </a>
            </div>
            <div className={styles.drawer}>
              <a className={styles.options} href="/Aboutus">
                ABOUT
              </a>
            </div>
            <div className={styles.drawer}>
              <a className={styles.options} href="/Work">
                WORK
              </a>
            </div>
            <div className={styles.drawer}>
              <a className={styles.options} href="/Contact">
                CONTACT
              </a>
            </div>
          </div>
        )}
        {isContentVisible && (
          <div className={styles.contentdiv}>
            <div className={styles.profile}>
              <div className={styles.prologo}>
                <IoMdContact className={styles.icon2} />
                <p className={styles.text}>Hi Guest</p>
              </div>
              <div className={styles.protext}>
                <div className={styles.text}>
                  <text>Login</text>
                </div>
                <div className={styles.text}>
                  <text>Track order</text>
                </div>
                <div className={styles.text}>
                  <text>Help center</text>
                </div>
              </div>
            </div>
            <div className={styles.drawer}>
              {Categories.map((category, index) => (
                <div
                  key={index}
                  className={styles.drawer}
                  // onClick={categoryFind(category)}
                >
                  {category.name}
                  <span>
                    <RiArrowDropDownLine />
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className={styles.headerbot}>
        {/* {Categories.map((category) => (
         
            <div
            className={styles.cat}
            onClick={categoryFind(category)}>
              {category.name}
              <span>
                <RiArrowDropDownLine />
              </span>
            </div>
        ))} */}
        {Categories.map((category, index) => (
          <div
            key={index}
            className={styles.cat}
            onMouseEnter={() => handleMouseEnter(category._id)}
            onMouseLeave={handleMouseLeave}
            onClick={categoryFind(category)}
          >
            {category.name}
            <span>
              <RiArrowDropDownLine />
            </span>

            {hoveredCategory === category._id && (
              <div className={styles.subCategories}>
                {subCategories.length > 0 ? (
                  subCategories.map((subCategory) => (
                    <div
                      key={subCategory._id}
                      className={styles.subCategory}
                      onClick={subCategoryFind(category, subCategory)}
                    >
                      {subCategory.name}
                    </div>
                  ))
                ) : (
                  <div>No subcategories available</div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Header;
