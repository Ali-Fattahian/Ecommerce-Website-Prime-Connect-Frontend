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

const EditUserProfilePage = () => {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { error, loading } = user;

  const formSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div>
        <Link to="/admin/user-list/">
            Go Back
        </Link>
      <FormContainer>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {/* {loading && <Loader />} Loader appears for no reason (loading is true) */}
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
              autoComplete="true"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="isAdmin">
            <Form.Check
              autoComplete="true"
              type="checkbox"
              label="Is Admin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            ></Form.Check>
          </Form.Group>
          <Button
            type="submit"
            className="w-100"
            style={{ backgroundColor: "#0095f6" }}
          >
            Edit
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default EditUserProfilePage;
