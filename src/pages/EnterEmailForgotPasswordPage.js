import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormContainer from "../components/FormContainer";
import axios from "axios";
import Message from "../components/Message";

const EnterEmailForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [sent, setSent] = useState(false);

  const formSubmitHandler = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/users/request-reset-email",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSent(true);
    } catch {
      setError(
        "An error occured trying to send the email, Please double check your entered email"
      );
    }
  };

  return (
    <FormContainer>
      {error && (
        <Message variant="danger" className="mt-4">
          {error}
        </Message>
      )}
      <Form
        onSubmit={formSubmitHandler}
        id="login-form"
        className="p-4 border-lt mt-4"
      >
        <Form.Group controlId="email">
          <Form.Label
            className="font-family-secondary"
            style={{ fontSize: "1.5rem" }}
          >
            Email Address
          </Form.Label>
          <Form.Control
            autoComplete="true"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="font-family-secondary"
            style={{ fontSize: "1.5rem" }}
          ></Form.Control>
          <Form.Text>Enter the email you used for your account</Form.Text>
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          className="w-100"
          style={{ color: "var(--bs-secondary)" }}
        >
          Sign In
        </Button>
        {sent && (
          <Message variant="success">
            We have sent a message to your email, Make sure to check the spam
            folder.
          </Message>
        )}
      </Form>
    </FormContainer>
  );
};

export default EnterEmailForgotPasswordPage;
