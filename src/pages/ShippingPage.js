import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../store/slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingPage = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(shippingAddress);
  const [address, setAddress] = useState(
    shippingAddress.address ? shippingAddress.address : ""
  );
  const [city, setCity] = useState(
    shippingAddress.city ? shippingAddress.city : ""
  );
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode ? shippingAddress.postalCode : ""
  );
  const [country, setCountry] = useState(
    shippingAddress.country ? shippingAddress.country : ""
  );

  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        address,
        city,
        postalCode,
        country,
      })
    );
    return navigate("/payment");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <Form onSubmit={formSubmitHandler} className="p-4 border-lt mt-4" id="shipping-form">
      <h1 className="txt--black">Shipping</h1>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            autoComplete="true"
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            required
            autoComplete="true"
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            required
            autoComplete="true"
            type="text"
            placeholder="Enter Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            required
            autoComplete="true"
            type="text"
            placeholder="Enter Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" className="w-100" style={{backgroundColor: "#0095f6"}}>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;
