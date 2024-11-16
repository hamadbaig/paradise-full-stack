"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import styles from "./login.module.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    if (user) {
      googleSignup();
    }
  }, [user]);

  const handleGoogleLogin = async () => {
    window.location.href = "/api/auth/login?returnTo=/Login";
  };

  const googleSignup = async () => {
    if (user) {
      setEmail(user.email);
      setFullName(user.name);
      registerUser();
      // const result = await collectData();

      // if (!result.success) {
      //   await registerUser();
      // }
    }
  };

  const registerUser = async () => {
    try {
      const result = await fetch(`${apiUrl}/signup`, {
        method: "post",
        body: JSON.stringify({ email, fullName }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await result.json();
      console.log("Signup result:", data);

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", JSON.stringify(data.token));
        router.push(`/cart`);
      } else {
        console.log("User already exists or signup error:", data.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  // const collectData = async () => {
  //   try {
  //     let result = await fetch(`${apiUrl}/login`, {
  //       method: "post",
  //       body: JSON.stringify({ email }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     result = await result.json();
  //     console.log(result);

  //     if (result.success) {
  //       localStorage.setItem("user", JSON.stringify(result.data));
  //       localStorage.setItem("token", JSON.stringify(result.token));
  //       router.push(`/cart`);
  //       return { success: true };
  //     } else {
  //       return { success: false };
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     alert("An error occurred during login. Please try again.");
  //     return { success: false };
  //   }
  // };

  return (
    <div className={styles.signupMain}>
      <h1>Login</h1>
      <input
        className={styles.inputBox}
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
      />
      <button
        onClick={handleGoogleLogin}
        className={styles.signupButton}
        type="button"
      >
        Login with Google
      </button>
      <button className={styles.signupButton} type="button">
        <a href="/api/auth/logout">Logout</a>
      </button>
    </div>
  );
};

export default Login;
