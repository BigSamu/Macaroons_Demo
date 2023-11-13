import React, { useState } from "react";

import { CLIENT_URL } from "../../config";

import { Form, InputGroup, Toast, Button, Modal, Image } from "react-bootstrap";
import { Link } from "react-bootstrap-icons";

import {
  copyTextToClipboard,
  formatUrlQueryData,
  parseSharingOptionsIntoACaveatList,
  addFirstPartyCaveatsAndSerialize,
} from "../../utils";

import _ from "lodash";

//******************************************************************************
// MAIN COMPONENT
//******************************************************************************

const MacaroonAttributesModal = (props) => {
  //-----------------------------------
  // I) HOOKS & VARIABLES
  // ----------------------------------

  // Props
  const { openModal, setOpenModal } = props;

  //------------------------------------------
  // II) HANDLERS & AUX FUNCTIONS
  //------------------------------------------

  const handleCloseOfModal = () => {
    setOpenModal({ ...openModal, shareLink: false });
  };

  //------------------------------------------
  // JSX
  //------------------------------------------

  return (
    <>
      <Modal
        show={openModal.shareLink}
        onHide={handleCloseOfModal}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="mx-2">
            Composition of a Macaroon Token
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Image
            size={"auto"}
            src={"/assets/macaroon_attributes.png"}
            thumbnail
          />
          <p className="mt-4">
            {" "}
            Above, you can observe the various attributes that constitute a
            macaroon. In this demonstration, we are exclusively utilizing
            first-party caveats. To implement third party caveats it will be
            required to have an identity provider able to mint discharge
            macaroons. This is further elaborated in the Google{" "}
            <a
              href="https://storage.googleapis.com/pub-tools-public-publication-data/pdf/41892.pdf"
              target="_blank"
            >
              research paper
            </a>
            , which provides in-depth details on those type of caveats.{" "}
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MacaroonAttributesModal;
