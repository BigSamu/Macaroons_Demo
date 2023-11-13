import React from "react";
import { headers } from "next/headers";
import { redirect } from 'next/navigation'

import LoginPageWrapper from "../../components/PageWrappers/LoginPageWrapper";

import { userService } from "../../services";
import { parseCookies } from "../../utils";

//******************************************************************************
// SERVER SIDE PROPS
//******************************************************************************

const checkLoginStatus = async () => {
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

  if (currentUserSS) {
    redirect("/");
  }

  return {
    props: {},
  };
};

//******************************************************************************
// MAIN COMPONENT
//******************************************************************************

const LandingPage = async (props) => {
  //------------------------------------------
  // JSX
  //------------------------------------------

  await checkLoginStatus();

  return (
    <>
      <LoginPageWrapper />
    </>
  );
};

export default LandingPage;
