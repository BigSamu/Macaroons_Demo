'use client';

import React from "react";

import { Container } from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";

//******************************************************************************
// MAIN COMPONENT
//******************************************************************************

const Layout = (props) => {
  //------------------------------------------
  // JSX
  //------------------------------------------

  return (
    <div className="d-flex flex-column vh-100">
      <Header />
      <Container className="flex-fill p-5 pb-3">{props.children}</Container>
      <Footer />
    </div>
  );
};

export default Layout;
