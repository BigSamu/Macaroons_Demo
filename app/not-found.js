import React from "react";
import Link from "next/link";

//******************************************************************************
// MAIN COMPONENT
//******************************************************************************

const NotFound = () => {
  //------------------------------------------
  // JSX
  //------------------------------------------

  return (
    <div className="text-center my-5">
      <h1>Ooooops...</h1>
      <h2>That page you are looking cannot be found</h2>
      <div className="d-flex flex-column justify-content-center align-items-center h-100">
        <img
          src={"/assets/crying_macaroon_2.jpeg"}
          className="img-fluid"
          width={360}
        ></img>
      </div>
      <h5 className="mt-3">
        Go back to{" "}
        <span className="button btn-link">
          <Link href="/">Homepage</Link>
        </span>
      </h5>
    </div>
  );
};

export default NotFound;
