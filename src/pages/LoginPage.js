import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { login } from "../store/slices/userSlice";
import FormContainer from "../components/FormContainer";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const redirect = window.location.search
    ? window.location.search.split("=")[1]
    : "";

  const userState = useSelector((state) => state.user);
  const { error, loading, userInfo } = userState;

  useEffect(() => {
    if (userInfo) {
      let link = window.location.href;
      if (link.includes("?redirect=")) {
        link = link.split("?redirect=");
        navigate(link[1]);
      } else {
        navigate("/");
      }
    }
  }, [userInfo, navigate]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <FormContainer>
      {error && (
        <Message variant="danger" className="mt-4">
          {error}
        </Message>
      )}
      {loading && <Loader />}
      <Form
        onSubmit={formSubmitHandler}
        id="login-form"
        className="p-4 border-lt mt-4"
      >
        <h1
          className="font-family-secondary txt--black text-center"
          style={{ fontSize: "3rem" }}
        >
          Sign In
        </h1>
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
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label
            className="font-family-secondary"
            style={{ fontSize: "1.5rem" }}
          >
            Password
          </Form.Label>
          <Form.Control
            autoComplete="true"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="font-family-secondary"
            style={{ fontSize: "1.5rem" }}
          ></Form.Control>
        </Form.Group>
        <div className="d-flex flex-column">
          <p
            style={{ fontSize: "1.2rem" }}
            className="txt--gray font-family-secondary d-inline-block"
          >
            New Customer?
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
              className="font-family-secondary px-2 txt--blue"
              style={{ fontSize: "1.2rem", textDecoration: "none" }}
            >
              Register
            </Link>
          </p>
          <div className="login-link__container border-top-lt p-3 px-0">
            <Link to="/" className="font-family-secondary txt--blue">
              Enter as a Guest
            </Link>
            <Link to="/" className="font-family-secondary txt--blue">
              Forgot Your Password?
            </Link>
          </div>
        </div>
        <Button
          type="submit"
          variant="primary"
          className="w-100"
          style={{ color: "var(--bs-secondary)" }}
        >
          Sign In
        </Button>
      </Form>
    </FormContainer>
  );
};

export default LoginPage;
