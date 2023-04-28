import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { register } from "../store/slices/userSlice";
import FormContainer from "../components/FormContainer";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const redirect = window.location.search
    ? window.location.search.split("=")[1]
    : "";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { error, loading } = user;

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register({ fullname, email, password }));
      navigate("/");
    }
  };

  return (
    <FormContainer className='pt-3'>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form
        onSubmit={formSubmitHandler}
        id="register-form"
        className="p-4 border-lt mt-4"
      >
        <h1
          className="font-family-secondary txt--black text-center"
          style={{ fontSize: "3rem" }}
        >
          Register
        </h1>
        <Form.Group controlId="name">
          <Form.Label
            className="font-family-secondary"
            style={{ fontSize: "1.5rem" }}
          >
            Full Name
          </Form.Label>
          <Form.Control
            required
            autoComplete="true"
            type="text"
            placeholder="Enter Full Name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label
            className="font-family-secondary"
            style={{ fontSize: "1.5rem" }}
          >
            Email Address
          </Form.Label>
          <Form.Control
            required
            autoComplete="true"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            required
            autoComplete="true"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="passwordConfirm">
          <Form.Label
            className="font-family-secondary"
            style={{ fontSize: "1.5rem" }}
          >
            Confirm Password
          </Form.Label>
          <Form.Control
            required
            autoComplete="true"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <p style={{ fontSize: '1.2rem' }} className="txt--gray font-family-secondary d-inline-block">Have an Account?</p>
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"} className="font-family-secondary px-2" style={{fontSize: "1.2rem"}}>
            Sign In
          </Link>
        <Button type="submit" className="w-100" style={{backgroundColor: "#0095f6"}}>
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterPage;
