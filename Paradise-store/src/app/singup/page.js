"use client";

import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";

import styles from "./Signup.module.css";
const signup = () => {
  const [fullname, setName] = useState("");
  s;
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  // const navigate = useNavigate();
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      router.push(`/cart`);
    }
  });
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const collectdata = async () => {
    console.warn("name:email:password", Name, email, password);
    let result = await fetch(`${apiUrl}/signup`, {
      method: "post",
      body: JSON.stringify({ fullname, email, password }),
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    console.log(result);
    localStorage.setItem("user", JSON.stringify(result));
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.result));
      localStorage.setItem("auth", JSON.stringify(result.auth));

      navigate("/cart");
    }
  };
  return (
    <div className={styles.signupMain}>
      <h1>Register</h1>
      <input
        className={styles.inputBox}
        type="text"
        s
        value={Name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Name"
      />
      <input
        className={styles.inputBox}
        type="text"
        value={email}
        onChange={(e) => setemail(e.target.value)}
        placeholder="Enter Email"
      />
      <input
        className={styles.inputBox}
        type="Password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
        placeholder="Enter Password"
      />
      <button
        onClick={collectdata}
        className={styles.signupButton}
        type="button "
      >
        Submit
      </button>
    </div>
  );
};
export default signup;
