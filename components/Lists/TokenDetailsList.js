import React from "react";

import { Alert, Figure } from "react-bootstrap";

import _ from "lodash";

//******************************************************************************
// MAIN COMPONENT
//******************************************************************************

const TokenDetailsList = (props) => {
  //-----------------------------------
  // HOOKS & VARIABLES
  // ----------------------------------

  // Props
  const { accessToken, decodedTokenDetails } = props;

  //------------------------------------------
  // JSX
  //------------------------------------------

  return (
    <>
      <Alert variant="secondary" className="h-100">
        <Alert.Heading>
          <span>Macaroon Token Details: </span>
        </Alert.Heading>
        <hr className="my-1" />
        <div>
          <p className="fw-bold mb-1">
            {" "}
            <u>Encoded Value:</u>{" "}
          </p>
          <div className="mx-3">
            <p className="text-break mb-0">{accessToken?.value} </p>
          </div>
        </div>
        <p className="fw-bold mt-2 mb-0">
          {" "}
          <u>Decoded Value:</u>{" "}
        </p>
        <ul className="mb-1">
          {!_.isEmpty(decodedTokenDetails) &&
            _.map(decodedTokenDetails, (value, key) => (
              <li key={key} className="text-break">
                <span className="fw-bold">{key}: </span>
                <>
                  {key === "cid" ? (
                    <ul>
                      {" "}
                      {_.map(value, (item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}{" "}
                    </ul>
                  ) : (
                    value
                  )}
                </>
              </li>
            ))}
        </ul>
        <hr />
        <Figure className="d-flex flex-column align-items-center justify-content-center">
          <Figure.Image
            width={200} // You can set width directly on Figure.Image
            src={
              !accessToken?.isShared
                ? "assets/happy_macaroon.jpeg"
                : "../assets/crying_macaroon.png"
            }
            thumbnail
          />
          <Figure.Caption className="w-75 text-center">
            {!accessToken?.isShared
              ? "Awesome!! You have unrestricted access to all pictures!!!"
              : "Oh no! You are being restricted in the access of the resources! Hope you can check at least one of the pictures"}
          </Figure.Caption>
        </Figure>
      </Alert>
    </>
  );
};

export default TokenDetailsList;
