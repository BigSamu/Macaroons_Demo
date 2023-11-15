import React from "react";
import { redirect } from "next/navigation";

import AboutPageWrapper from "../../../../components/PageWrappers/AboutPageWrapper";

import { userService } from "../../../../services";

import _ from "lodash";

//******************************************************************************
// SERVER SIDE PROPS
//******************************************************************************

const getData = async (access_token, email) => {
  let currentUserSS = null;
  let currentRootUserSS = null;

  currentUserSS = {
    id: 0,
    email: email,
  };

  const options = {
    headers: {
      Cookie: `access_token = Bearer ${access_token}`,
    },
    serverSide: true,
  };

  if (access_token) {
    try {
      currentRootUserSS = await userService.getCurrent(options);
    } catch (error) {
      // If macaroon is an invalid one, then 401 error is returned
      if (error.response.status == 401) {
        redirect("/not-found");
      } else {
        console.log(error);
      }
    }
  }

  let accessTokenSS = {
    value: access_token,
    type: "Bearer",
    isShared: true,
  };

  return {
    currentUserSS: currentUserSS || {},
    accessTokenSS: accessTokenSS || {},
  };
};

//******************************************************************************
// MAIN COMPONENT
//******************************************************************************

const AboutPageSharedMacaroon = async (props) => {
  //-----------------------------------
  // HOOKS & VARIABLES
  //-----------------------------------

  // Server Side Props
  const { currentUserSS, accessTokenSS } = await getData();

  //------------------------------------------
  // JSX
  //------------------------------------------

  return (
    <>
      <AboutPageWrapper
        currentUserSS={currentUserSS}
        accessTokenSS={accessTokenSS}
      />
    </>
  );
};

export default AboutPageSharedMacaroon;
