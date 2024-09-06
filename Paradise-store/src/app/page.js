"use client";
import React, { Fragment } from "react";
import Home from "@/component/products/Home";
import Commitment from "@/component/common/Commitment";
const App = () => {
  return (
    <Fragment>
      <section id="home" className="app">
        <Home />
        <Commitment />
      </section>
    </Fragment>
  );
};

export default App;
