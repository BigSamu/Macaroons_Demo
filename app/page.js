import React from "react";
import { headers } from "next/headers";
import { redirect } from 'next/navigation'

import LandingPageWrapper from "../components/PageWrappers/LandingPageWrapper";

import { userService, resourceService } from "../services";
import { parseCookies } from "../utils";

import _ from "lodash";

//******************************************************************************
// SERVER SIDE PROPS
//******************************************************************************

const getData = async () => {
  let currentUserSS = null;
  let { access_token } = parseCookies(headers().get("cookie"));

  const options = {
    headers: { Cookie: headers().get("cookie") },
    serverSide: true,
  };

  if (access_token) {
    try {
      currentUserSS = await userService.getCurrent(options);
    } catch (error) {
      console.log(error);
    }
  }

  if (!currentUserSS) {
    redirect('/login');
  }

  let resourcesSS = await resourceService.getAll(options);
  let accessTokenSS = {
    value: _.split(access_token, " ")[1],
    type: _.split(access_token, " ")[0],
    isShared: false,
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

const LandingPage = async (props) => {
  //-----------------------------------
  // HOOKS & VARIABLES
  //-----------------------------------

  // Server Side Props
  const { resourcesSS, currentUserSS, accessTokenSS } = await getData();

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

export default LandingPage;
