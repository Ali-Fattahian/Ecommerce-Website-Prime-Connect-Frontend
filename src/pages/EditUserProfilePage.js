import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserProfile, updateUserProfile } from "../store/slices/userSlice";
import FormContainer from "../components/FormContainer";

const EditUserProfilePage = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { error, loading, userProfile, userInfo } = user;
  const [email, setEmail] = useState(userProfile ? userProfile.email : "");
  const [fullname, setFullname] = useState(
    userProfile ? userProfile.fullname : ""
  );
  const [isAdmin, setIsAdmin] = useState(
    userProfile ? userProfile.isAdmin : false
  );

  useEffect(() => {
    if (userInfo) {
      if (!userProfile) {
        dispatch(getUserProfile(userInfo.token));
      }
    } else {
      setMessage("You are unauthorized, please log in first");
    }
  }, [userInfo, userProfile, dispatch]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const data = {
      fullname,
      email,
      isAdmin,
      token: userInfo.token,
    };
    dispatch(updateUserProfile(data));
  };

  return (
    <div>
      <FormContainer>
        <div className="mt-2">
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
        </div>
        {loading && <Loader />}{" "}
        {/* Loader appears for no reason (loading is true) */}
        <Form
          onSubmit={formSubmitHandler}
          id="register-form"
          className="p-4 border-lt mt-2"
        >
          <strong><p className="txt--blue" style={{textDecoration: "underline", cursor: "pointer"}} onClick={() => {navigate(-1)}}>Go Back</p></strong>
          <h1
            className="font-family-secondary txt--black text-center p-4"
            style={{ fontSize: "3rem" }}
          >
            EDIT YOUR ACCOUNT
          </h1>
          <Form.Group controlId="name" className="mt-4">
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
            style={{ backgroundColor: "#0095f6", border: "none" }}
          >
            Edit
          </Button>
          <Button
            type="reset" // Not working
            className="w-100 border-lt mt-2"
            style={{ backgroundColor: "white", color: "black" }}
          >
            Reset
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default EditUserProfilePage;
