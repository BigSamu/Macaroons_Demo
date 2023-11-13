import React, { useState, useContext } from "react";

import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { ShieldLockFill, PersonCircle, Asterisk } from "react-bootstrap-icons";

import { useAuthContext } from "../../contexts/AuthContext";

//******************************************************************************
// MAIN COMPONENT
//******************************************************************************

const LoginForm = (props) => {
  //-----------------------------------
  // HOOKS & VARIABLES
  // ----------------------------------

  // States
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  // Contexts
  const { login, error } = useAuthContext();

  //------------------------------------------
  // HANDLERS & AUX FUNCTIONS
  //------------------------------------------

  const handleOnChangeCredentials = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmitLogIn = async (e) => {
    e.preventDefault();
    
    login(credentials);
    if (error) {
      setCredentials({
        username: "",
        password: "",
      });
    }
  };

  //------------------------------------------
  // JSX
  //------------------------------------------

  return (
    <div>
      <div className="d-flex justify-content-center ">
        <div className="bg-secondary border border-2 rounded-circle p-3 ">
          <ShieldLockFill color="white" size={40} />
        </div>
      </div>
      {error ? (
        <Alert variant="danger" className="mt-3 py-2">
          <small>{error}</small>
        </Alert>
      ) : (
        ""
      )}
      <Form onSubmit={handleOnSubmitLogIn}>
        <Form.Group as={Row} className="mt-4 align-items-center">
          <Form.Label column sm="5">
            <div>
              <PersonCircle size={30} />
              <span className="ms-3">Username</span>
            </div>
          </Form.Label>
          <Col sm="7">
            <Form.Control
              type="email"
              placeholder="alice@example.com"
              name="username"
              value={credentials.username}
              onChange={handleOnChangeCredentials}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mt-4 align-items-center">
          <Form.Label column sm="5">
            <div>
              <Asterisk size={10} />
              <Asterisk size={10} />
              <Asterisk size={10} />
              <span className="ms-3">Password</span>
            </div>
          </Form.Label>
          <Col sm="7">
            <Form.Control
              type="password"
              placeholder="password"
              name="password"
              value={credentials.password}
              onChange={handleOnChangeCredentials}
            />
          </Col>
        </Form.Group>

        <Button
          className="mt-4 d-block mx-auto"
          variant="primary"
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
