import React from "react";

import { STATIC_URL } from "../../config";
import { Image } from "react-bootstrap";
import { Image as ImageIcon } from "react-bootstrap-icons";

import { useResourceContext } from "../../contexts/ResourceContext";

import _ from "lodash";

//******************************************************************************
// MAIN COMPONENT
//******************************************************************************

const ResourceImage = (props) => {
  //-----------------------------------
  // HOOKS & VARIABLES
  // ----------------------------------

  // Contexts
  const { currentResource } = useResourceContext();

  //------------------------------------------
  // JSX
  //------------------------------------------

  return (
    <div>
      <h5 className="mb-3">
        <span className="text-decoration-underline">Resource</span>
      </h5>
      <div className="mx-0 mx-xl-3">
        <>
          {!_.isEmpty(currentResource) ? (
            <Image
              size={"auto"}
              src={`${STATIC_URL}/${currentResource?.image_url}`}
              thumbnail
            />
          ) : (
            <div className="d-flex flex-column justify-content-center align-items-center h-100 my-5">
              <ImageIcon size={"auto"} color="gray" className="w-50"/>
              <p className="fw-bold text-secondary"> Resource Image </p>
            </div>
          )}
          <div className="mt-2">
            <p>
              <strong>{currentResource?.title}</strong>{" "}
              <i>{currentResource?.description}</i>
            </p>
          </div>
        </>
      </div>
    </div>
  );
};

export default ResourceImage;
