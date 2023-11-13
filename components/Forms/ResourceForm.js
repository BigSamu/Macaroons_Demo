import React, { useState } from "react";
import { Form, Button, Alert, Row, Col } from "react-bootstrap";

import { useResourceContext } from "../../contexts/ResourceContext";
import { resourceService } from "../../services";

import _ from "lodash";

//******************************************************************************
// MAIN COMPONENT
//******************************************************************************

const ResourceForm = (props) => {
  //-----------------------------------
  // HOOKS & VARIABLES
  // ----------------------------------

  // Props
  const { resources, accessShared } = props;

  // Contexts
  const { currentResource, setCurrentResource } = useResourceContext();

  // States
  const [selectedResource, setSelectedResource] = useState(currentResource);
  const [errorMessage, setErrorMessage] = useState();

  //------------------------------------------
  // HANDLERS & AUX FUNCTIONS
  //------------------------------------------

  const handleOnChangeSelectedResource = (e) => {
    let resourceId = e.target.value;
    let resourceToUpdate = resources.find((item) => item.id == resourceId);
    setSelectedResource({ ...resourceToUpdate });
  };

  const handleOnSubmitLoadData = async (e) => {
    e.preventDefault();
    try {
      let resourceToUpdate = !accessShared
        ? await resourceService.getOneById(selectedResource.id)
        : await resourceService.getOneSharedById(selectedResource.id);

      setCurrentResource(resourceToUpdate);
      setErrorMessage("");
    } catch (error) {
      switch (error?.response?.status) {
        case 401:
          setErrorMessage("Access not authorized.");
          break;
        case 403:
          setErrorMessage("Access not authorized.");
          break;
        case 404:
          setErrorMessage(
            "Resource not found in database. Please check your inputs."
          );
          break;
        case 422:
          setErrorMessage(
            "Selection option not valid. Please check your inputs."
          );
          break;
      }
      setCurrentResource({});
    }
  };

  //------------------------------------------
  // JSX
  //------------------------------------------

  return (
    <>
      <Form onSubmit={handleOnSubmitLoadData}>
        {!_.isEmpty(errorMessage) && (
          <Alert variant="danger py-1">{errorMessage}</Alert>
        )}

        <Form.Group
          as={Row}
          className="mb-1 align-items-center justify-content-start"
        >
          <Col xs="auto">
            <Form.Select
              size="sm"
              name="filename"
              onChange={handleOnChangeSelectedResource}
              value={selectedResource?.id}
            >
              <option default value={""}>
                -- Select --
              </option>
              {!_.isEmpty(resources) &&
                resources.map((item, idx) => (
                  <option key={idx} value={item.id}>
                    {`Resource #${item.id}`}
                  </option>
                ))}
            </Form.Select>
          </Col>
          <Col xs="auto" className="mt-2 mt-sm-0 px-1">
            <Button variant="success" size="sm" className="mx-1" type="submit">
              Load Data
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};

export default ResourceForm;
