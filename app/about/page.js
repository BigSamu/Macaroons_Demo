import React from "react";
import { headers } from "next/headers";
import { redirect } from 'next/navigation'

import AboutPageWrapper from "../../components/PageWrappers/AboutPageWrapper";

import { userService } from "../../services";
import { parseCookies } from "../../utils";

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

  let accessTokenSS = {
    value: _.split(access_token, " ")[1],
    type: _.split(access_token, " ")[0],
    isShared: false,
  };

  return {
    currentUserSS: currentUserSS || {},
    accessTokenSS: accessTokenSS || {},
  };
};

//******************************************************************************
// MAIN COMPONENT
//******************************************************************************

const AboutPage = async (props) => {
  //-----------------------------------
  // HOOKS & VARIABLES
  //-----------------------------------

  // Server Side Props
  const {currentUserSS, accessTokenSS } = await getData();

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

export default AboutPage;
