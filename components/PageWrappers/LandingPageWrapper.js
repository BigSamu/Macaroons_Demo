"use client";

import React, { useState, useEffect } from "react";

import { Row, Col, Button, Alert } from "react-bootstrap";

import ResourceForm from "../Forms/ResourceForm";
import TokenDetailsList from "../Lists/TokenDetailsList";
import ResourceImage from "../Images/ResourceImage";
import ShareLinkFormModal from "../Modals/ShareLinkFormModal";

import { settingCookiesFromSharedMacaroon } from "../../app/actions";
import { parseMacaroonToken } from "../../utils";

import _ from "lodash";

const LandingPageWrapper = (props) => {
  //-----------------------------------
  // HOOKS & VARIABLES
  //-----------------------------------

  // States
  const { resourcesSS, currentUserSS, accessTokenSS } = props;
  const [resources, setResources] = useState(resourcesSS);
  const [currentUser, setCurrentUser] = useState(currentUserSS);
  const [currentResource, setCurrentResource] = useState();
  const [accessToken, setAccessToken] = useState(accessTokenSS);
  const [decodedTokenDetails, setDecodedTokenDetails] = useState(
    parseMacaroonToken(accessToken?.value)
  );
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
        <Col sm={12} md={6}>
          <Alert variant="warning" className="py-2">
            <h5 className="fw-bold mb-0">
              {`Welcome ${_.capitalize(currentUser?.email.split("@")[0])}!`}
            </h5>
          </Alert>
          <p className="mb-2">
            {accessToken?.isShared
              ? "Congratulations! You have unrestricted access to the following resources"
              : "Hi there! You have a restricted access token. Select an option to check which resources you can access:"}
          </p>
          <ResourceForm
            resources={resources}
            accessShared={accessToken?.isShared}
          />
          <hr />

          <ResourceImage currentResource={currentResource} />

          <Button
            variant="primary"
            type="button"
            className="mx-0 mt-2"
            onClick={handleOnClickOpenShareLinkModal}
          >
            Share Resources
          </Button>
        </Col>
        <Col sm={12} md={6} className="mt-3 mt-xl-0">
          <TokenDetailsList
            accessToken={accessToken}
            decodedTokenDetails={decodedTokenDetails}
          />
        </Col>
      </Row>

      <ShareLinkFormModal
        resources={resources}
        accessToken={accessToken}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </div>
  );
};

export default LandingPageWrapper;
