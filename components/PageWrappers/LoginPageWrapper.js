"use client";

import React from "react";

import { Row, Col } from "react-bootstrap";

import LoginForm from "../Forms/LoginForm";
import DefaultUsersInfoBox from "../Cards/DefaultUsersInfoBox";

const LoginPageWrapper = () => {
  return (
    <div>
      <Row className="justify-content-center">
        <Col xs={12} md={9} lg={8} xl={6}>
          <div className="border border-2 rounded p-5 my-5 mx-lg-5">
            <LoginForm />
            <DefaultUsersInfoBox />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPageWrapper;
