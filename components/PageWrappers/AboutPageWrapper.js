"use client";

import React, { useState, useEffect } from "react";

import { Row, Col, Button, Alert, Image } from "react-bootstrap";

import { settingCookiesFromSharedMacaroon } from "../../app/actions";

import MacaroonAttributesModal from "../Modals/MacaroonAttributesModal";

import _ from "lodash";

const AboutPageWrapper = (props) => {
  //-----------------------------------
  // HOOKS & VARIABLES
  //-----------------------------------

  // States
  const { currentUserSS, accessTokenSS } = props;
  const [currentUser, setCurrentUser] = useState(currentUserSS);
  const [accessToken, setAccessToken] = useState(accessTokenSS);

  const [openModal, setOpenModal] = useState({
    shareLink: false,
  });

  // Effects
  useEffect(() => {
    if (accessToken?.isShared) {
      settingCookiesFromSharedMacaroon(accessToken?.value);
    }
  }, []);

  //------------------------------------------
  // HANDLERS & AUX FUNCTIONS
  //------------------------------------------

  const handleOnClickOpenShareLinkModal = (e) => {
    setOpenModal({ ...openModal, shareLink: true });
  };

  //------------------------------------------
  // JSX
  //------------------------------------------

  return (
    <div>
      <Row className="align-items-strech justify-content-start">
        <Col sm={12} xl={6}>
          <Alert variant="warning" className="py-2 mb-2">
            <h5 className="fw-bold mb-0">{`What is a Macaroon?`}</h5>
          </Alert>
          <p>
            Have you ever wondered how cloud storage services like Google Drive
            or Microsoft OneDrive enable users to share files and resources with
            others, while also managing permissions such as editing or viewing
            rights? These platforms often utilize advanced authorization
            mechanisms to control access, ensuring security and flexibility. How
            exactly do they achieve this intricate balance?{" "}
            <strong>
              <u>Introducing macaroon tokens!</u>
            </strong>
          </p>
          <p>
            Macaroon tokens are a type of digital token used for authentication
            and authorization in computer systems. They represent a significant
            evolution from traditional access tokens due to their flexibility
            and fine-grained control. Unlike simple tokens which carry only a
            static set of permissions, macaroons can have additional
            restrictions, or "caveats," attached to them. These caveats can
            specify conditions under which the token is valid, such as time
            constraints, specific actions permitted, or validation by
            third-party services.
          </p>
          <p>
            Originating from a{" "}
            <a
              href="https://storage.googleapis.com/pub-tools-public-publication-data/pdf/41892.pdf"
              target="_blank"
            >
              research
            </a>{" "}
            by Google, macaroons are unique in that they enable users to
            delegate their permissions in a controlled manner. For instance, a
            user with a macaroon can add caveats to delegate a subset of their
            permissions to another user, without needing to involve the token
            issuer. This delegation is secure because each added caveat narrows
            the scope of the token's use, never expanding it. Furthermore,
            macaroons are designed to be efficient and secure. Their structure
            is based on chained HMACs, ensuring integrity and authenticity.
            Macaroon tokens are particularly useful in distributed systems and
            scenarios requiring nuanced permission management.
          </p>

          <Button
            variant="primary"
            type="button"
            className="mx-0 my-1"
            onClick={handleOnClickOpenShareLinkModal}
          >
            What contains a Macaroon Token?
          </Button>

          <MacaroonAttributesModal
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        </Col>
        <Col sm={12} xl={6} className="mt-3 mt-xl-0 px-0 px-xl-4">
          <h5 className="fw-bold mb-1">
            Macaroon Attenuation and Descentralized Delegation
          </h5>
          <p>
            <i>Use of First-Party Caveats</i>
          </p>
          <div className="px-0 px-xl-3">
            <Image
              size={"auto"}
              src={
                "/assets/macaroon_attenuation_and_descentralized_delegation.png"
              }
              thumbnail
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AboutPageWrapper;
