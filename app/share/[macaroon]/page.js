import React from "react";
import { redirect } from "next/navigation";

import LandingPageWrapper from "../../../components/PageWrappers/LandingPageWrapper";

import { resourceService, userService } from "../../../services";
import { settingCookiesFromSharedMacaroon } from "../../actions";

import _ from "lodash";

//******************************************************************************
// SERVER SIDE PROPS
//******************************************************************************

const getData = async (access_token, email) => {
  let currentUserSS = null;
  let currentRootUserSS = null;

  currentUserSS = {
    id: 0,
    "email": email,
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


  let resourcesSS = await resourceService.getAll(options);
  let accessTokenSS = {
    value: access_token,
    type: 'Bearer',
    isShared: true,
  };

  return {
    currentUserSS: currentUserSS || {},
    resourcesSS: resourcesSS || [],
    accessTokenSS: accessTokenSS || {},
  };
};

//******************************************************************************
// MAIN COMPONENT
//******************************************************************************

const LandingPageMacaroon = async ({ params, searchParams }) => {
  //-----------------------------------
  // HOOKS & VARIABLES
  //-----------------------------------

  const { macaroon } = params;
  const { email } = searchParams;

  const { resourcesSS, currentUserSS, accessTokenSS } = await getData(macaroon, email);

  //------------------------------------------
  // JSX
  //------------------------------------------

  return (
    <>
      <LandingPageWrapper
        resourcesSS={resourcesSS}
        currentUserSS={currentUserSS}
        accessTokenSS={accessTokenSS}
      />
    </>
  );
};

export default LandingPageMacaroon;
