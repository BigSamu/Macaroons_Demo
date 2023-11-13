import React from "react";

//******************************************************************************
// MAIN COMPONENT
//******************************************************************************

const Footer = () => {
  //------------------------------------------
  // JSX
  //------------------------------------------

  return (
    <>
      <footer className="bg-light">
        <div className="container py-2">
          <p className="text-center m-0">
            <small>
              © 2023 Copyright
              <a href="https://bigsamu.com/" className="link-primary"> <u>BigSamu Dev</u> </a>
            </small>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
