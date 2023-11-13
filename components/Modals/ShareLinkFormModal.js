import React, { useState } from "react";

import { CLIENT_URL } from "../../config";

import {
  Form,
  InputGroup,
  Toast,
  Button,
  Modal,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
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

const ShareLinkFormModal = (props) => {
  //-----------------------------------
  // I) HOOKS & VARIABLES
  // ----------------------------------

  // Props
  const { resources, accessToken, openModal, setOpenModal } = props;

  // States
  const [sharingOptions, setSharingOptions] = useState({
    resources: _.assign({}, ...resources.map((item) => ({ [item.id]: false }))),
    timeout: 30,
  });
  const [targetUser, setTargetUser] = useState({
    email: "johndoe@example.com",
  });
  const [showToast, setShowToast] = useState(false);

  //------------------------------------------
  // II) HANDLERS & AUX FUNCTIONS
  //------------------------------------------

  const handleOnChangeResourcesSharingOptions = async (e) => {
    let isChecked = e.target.checked;
    let resourceId = e.target.name;

    setSharingOptions({
      ...sharingOptions,
      resources: {
        ...sharingOptions.resources,
        [resourceId]: isChecked,
      },
    });
  };

  const handleOnChangeTimeoutSharingOptions = async (e) => {
    let timeoutToUpdate = e.target.value;
    setSharingOptions({
      ...sharingOptions,
      timeout: timeoutToUpdate,
    });
  };

  const handleOnChangeTargetUser = async (e) => {
    setTargetUser({
      ...targetUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmitCreateLink = async (e) => {
    e.preventDefault();
    let caveatsList = parseSharingOptionsIntoACaveatList(sharingOptions);
    let restrictedMacaroon = addFirstPartyCaveatsAndSerialize(
      accessToken.value,
      caveatsList
    );

    let queryParams = formatUrlQueryData(targetUser);
    let linkToShare = `${CLIENT_URL}/share/${restrictedMacaroon}/?${queryParams}`;
    copyTextToClipboard(linkToShare);
    setShowToast(true);
  };

  const handleCloseOfModal = () => {
    setOpenModal({ ...openModal, shareLink: false });
  };

  //------------------------------------------
  // JSX
  //------------------------------------------

  return (
    <>
      <Modal show={openModal.shareLink} onHide={handleCloseOfModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Share Link</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleOnSubmitCreateLink}>
          <Modal.Body>
            <p className="mb-2">Select resources to share:</p>
            {!_.isEmpty(resources) &&
              resources.map((item, idx) => (
                <Form.Group
                  key={idx}
                  as={Row}
                  className="mb-1 align-items-center"
                >
                  <Form.Label column="xs" xs="auto">
                    <span className="fw-bold">{`Resource #${item.id}`}</span>
                  </Form.Label>
                  <Col xs="auto">
                    <Form.Check
                      type="switch"
                      className="mt-1"
                      name={item.id}
                      checked={sharingOptions.resources[item.id]}
                      label={
                        sharingOptions.resources[item.id]
                          ? "Share"
                          : "Don't Share"
                      }
                      onChange={handleOnChangeResourcesSharingOptions}
                    ></Form.Check>
                  </Col>
                </Form.Group>
              ))}

            <hr />
            <p className="mb-2">
              Select timeout for shared resources (default 30 sec):
            </p>
            <Form.Group as={Row} className="mb-1 align-items-center">
              <Form.Label column="sm" xs="auto">
                <span className="fw-bold">Duration</span>
              </Form.Label>
              <Col xs="auto">
                <InputGroup>
                  <Form.Control
                    size="sm"
                    type="number"
                    name="timeout"
                    placeholder="15"
                    min="0"
                    value={sharingOptions.timeout}
                    onChange={handleOnChangeTimeoutSharingOptions}
                  ></Form.Control>
                  <InputGroup.Text>sec</InputGroup.Text>
                </InputGroup>
              </Col>
            </Form.Group>

            <hr />
            <p className="mb-2"> Add email of target user:</p>
            <Form.Group as={Row} className="mb-1 align-items-center">
              <Form.Label column="sm" xs="2">
                <span className="fw-bold">Email</span>
              </Form.Label>
              <Col xs="auto">
                <Form.Control
                  size="sm"
                  type="email"
                  name="email"
                  placeholder="johndoe@example.com"
                  value={targetUser?.email}
                  onChange={handleOnChangeTargetUser}
                ></Form.Control>
              </Col>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseOfModal}>
              Close
            </Button>
            <Button
              variant="primary"
              type="submit"
              className="d-flex align-items-center"
            >
              <Link size={20} />
              <div className="ms-2">Copy Link</div>
            </Button>
            <Alert variant="warning" className="py-2 my-2 text-center">
              <small>
                <strong>Note:</strong> When testing the link, use a different
                browser or the same browser in incognito mode to avoid mixing
                information in cookies of different users.
              </small>
            </Alert>

            <Toast
              show={showToast}
              autohide
              delay={4000}
              onClose={() => setShowToast(false)}
              className="mx-auto"
            >
              <Alert variant="success" className="py-1 mb-0 text-center">
                Link Copied in Clipboard!
              </Alert>
            </Toast>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ShareLinkFormModal;
