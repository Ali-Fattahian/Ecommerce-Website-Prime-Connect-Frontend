import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../store/slices/userSlice";
import Message from "./Message";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";


const EditUserProfileForm = ({ userProfile, userInfo, userId, loading }) => {
  const [email, setEmail] = useState(userProfile.email);
  const [fullname, setFullname] = useState(userProfile.fullname);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(userProfile.isAdmin);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const navigate = useNavigate()

  const dispatch = useDispatch();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword)
      setConfirmPasswordError(
        "Password and Confirm Password fields have to match"
      );
    const data = {
      fullname,
      email,
      isAdmin,
      password,
      token: userInfo.token,
      id: userId,
    };
    if (password === confirmPassword) {
      dispatch(updateUserProfile(data))
      window.location.reload()
    };
  };

  useEffect(() => {
    if (userInfo.id !== userProfile.id && userProfile.isAdmin)
    navigate('/admin/user-list'); // Not allowed to edit an admin account
  }, [])

  const resetStateHandler = () => {
    setEmail(userProfile.email);
    setFullname(userProfile.fullname);
    setIsAdmin(userProfile.isAdmin);
  };
  return (
    <Form onSubmit={formSubmitHandler} id="register-form" className="p-4 mt-2">
      <h2 className="font-family-secondary txt--black">ACCOUNT</h2>
      <Form.Group controlId="name" className="mt-4">
        <Form.Label
          className="font-family-secondary"
          style={{ fontSize: "1rem" }}
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
          style={{ fontSize: "1rem" }}
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
      {userProfile.id === userInfo.id && <Form.Group controlId="password">
        <Form.Label
          className="font-family-secondary"
          style={{ fontSize: "1rem" }}
        >
          Change Password
        </Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter New Password"
          value={password}
          onChange={(e) => {
            setConfirmPasswordError("");
            setPassword(e.target.value.trim());
          }}
        ></Form.Control>
      </Form.Group>}
      {userProfile.id === userInfo.id && <Form.Group controlId="confirmPassword">
        <Form.Label
          className="font-family-secondary"
          style={{ fontSize: "1rem" }}
        >
          Confirm Password
        </Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPasswordError("");
            setConfirmPassword(e.target.value.trim());
          }}
        ></Form.Control>
      </Form.Group>}
      {confirmPasswordError.length > 0 && (
        <Message variant="danger" className="mt-4">
          {confirmPasswordError}
        </Message>
      )}
      {userInfo.isAdmin && userInfo.id !== userProfile.id && (
        <Form.Group controlId="isAdmin">
          <Form.Check
            autoComplete="true"
            type="checkbox"
            label="Is Admin"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          ></Form.Check>
        </Form.Group>
      )}
      <Button
        type="submit"
        className="w-100"
        variant="blue"
        style={{ border: "none", color: "#fff" }}
      >
        {loading ? "Loading" : "Edit"}
      </Button>
      <Button
        type="reset" // Not working
        className="w-100 border-lt mt-2"
        style={{ backgroundColor: "white", color: "black" }}
        onClick={resetStateHandler}
      >
        Reset
      </Button>
    </Form>
  );
};

export default EditUserProfileForm;
