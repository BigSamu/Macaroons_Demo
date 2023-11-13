"use client";

import React from "react";
import { Card, ListGroup } from "react-bootstrap";

const DefaultUsersInfoBox = () => {
  // Array of default users
  const defaultUsers = [
    {
      email: "alice@example.com",
      password: "alice",
    },
    {
      email: "bob@example.com",
      password: "bob",
    },
  ];

  return (
    <Card className=" mt-5 bg-info">
      <Card.Header as="h5" className="text-white">
        Default User Credentials
      </Card.Header>
      <ListGroup variant="flush">
        {defaultUsers.map((user, index) => (
          <ListGroup.Item key={index}>
            <small>
              <strong>Email:</strong> {user.email}
            </small>
            <br />
            <small>
              <strong>Password:</strong> {user.password}
            </small>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Card.Footer className="text-white">
        <small>Use these credentials to log in to the application.</small>
      </Card.Footer>
    </Card>
  );
};

export default DefaultUsersInfoBox;
