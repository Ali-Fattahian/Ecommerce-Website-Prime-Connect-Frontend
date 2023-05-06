import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { getOrderDetail, updateOrderToPaid } from "../store/slices/orderSlice";
import validator from "validator";

const EnterCardInformationPage = () => {
  const [cardNumber, setCardNumber] = useState("");
  const date = new Date();
  const currentYear = date.getFullYear();
  const [cvc, setCVC] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const { orderId } = useParams();
  const [CardError, setCardError] = useState(null);

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const navigate = useNavigate();
  const orders = useSelector((state) => state.orders);
  const { orderDetail, loading, success, error } = orders;
  const dispatch = useDispatch();
  const [formError, setFormError] = useState(null);

  const cardNumberChangeHandler = (value) => {
    setCardNumber(value);
    if (validator.isCreditCard(value)) {
      setCardError(false);
      setFormError("");
    } else {
      setCardError(true);
      setFormError("Please Enter a Valid Credit Card Number");
    }
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (
      cardNumber &&
      !CardError &&
      cvc &&
      month.length > 0 &&
      year.length > 0 &&
      userInfo
    ) {
      const token = userInfo.token;
      const totalPrice = orderDetail.totalPrice;
      dispatch(updateOrderToPaid({ orderId, token, totalPrice }));
      navigate(`/orders/${orderId}`);
    }
  };

  useEffect(() => {
    if (!userInfo) navigate("/login");
    if (success) window.location.reload(); // Fix success message staying on the screen from the last payment
    if (!orderDetail || orderDetail.id !== Number(orderId)) {
      const token = userInfo.token;
      dispatch(getOrderDetail({ orderId, token }));
    }
  }, [dispatch, orderDetail, orderId, navigate, orderDetail.isPaid, success]);

  return (
    <FormContainer>
      {loading && <Loader />}
      {!userInfo && <Message variant="info">Please Log in First</Message>}
      {orderDetail && userInfo && (
        <Form
          onSubmit={formSubmitHandler}
          id="register-form"
          className="p-4 border-lt mt-4"
        >
          <h1
            className="font-family-secondary txt--black text-center"
            style={{ fontSize: "3rem" }}
          >
            Payment
          </h1>
          {success && <Link to={`/users/${userInfo.id}/edit`}>Profile</Link>}
          {error && <Message variant="danger">{error}</Message>}
          <Form.Group controlId="totalPrice">
            <Form.Label
              className="font-family-secondary"
              style={{ fontSize: "1.5rem" }}
            >
              Total Price
            </Form.Label>
            <Form.Control
              readOnly
              type="text"
              value={orderDetail.totalPrice}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="cardNumber">
            <Form.Label
              className="font-family-secondary"
              style={{ fontSize: "1.5rem" }}
            >
              Card Number
            </Form.Label>
            <Form.Control
              required
              autoComplete="true"
              type="text"
              placeholder="Enter Card Number"
              value={cardNumber}
              onChange={(e) => {
                cardNumberChangeHandler(e.target.value.trim());
              }}
            ></Form.Control>
            {formError && (
              <Message variant="danger" className="mt-3">
                {formError}
              </Message>
            )}
          </Form.Group>
          <Form.Group controlId="cvc">
            <Form.Label
              className="font-family-secondary"
              style={{ fontSize: "1.5rem" }}
            >
              CVC
            </Form.Label>
            <Form.Control
              required
              autoComplete="true"
              type="text"
              placeholder="CVC"
              value={cvc}
              onChange={(e) => setCVC(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="month">
            <Form.Select
              className="mb-2"
              aria-label="Exp.Month"
              value={month}
              onChange={(e) => {
                setMonth(e.target.value);
              }}
            >
              <option>Month</option>
              <option value={1}>January</option>
              <option value={2}>Fabruary</option>
              <option value={3}>March</option>
              <option value={4}>April</option>
              <option value={5}>May</option>
              <option value={6}>June</option>
              <option value={7}>July</option>
              <option value={8}>August</option>
              <option value={9}>September</option>
              <option value={10}>October</option>
              <option value={11}>November</option>
              <option value={12}>December</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="year">
            <Form.Select
              className="mb-2"
              aria-label="Exp.Year"
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
              }}
            >
              <option>Year</option>
              <option value={currentYear}>{currentYear}</option>
              <option value={currentYear + 1}>{currentYear + 1}</option>
              <option value={currentYear + 2}>{currentYear + 2}</option>
              <option value={currentYear + 3}>{currentYear + 3}</option>
              <option value={currentYear + 4}>{currentYear + 4}</option>
              <option value={currentYear + 5}>{currentYear + 5}</option>
              <option value={currentYear + 6}>{currentYear + 6}</option>
              <option value={currentYear + 7}>{currentYear + 7}</option>
            </Form.Select>
          </Form.Group>
          <Button
            type="submit"
            className="w-100"
            style={{ color: "var(--bs-secondary)" }}
            variant={loading ? "info" : "primary"}
          >
            {loading ? "Loading..." : "Pay"}
          </Button>
          <Button
            type="button"
            variant="primary"
            style={{ color: "var(--bs-black)", backgroundColor: "transparent" }}
            onClick={() => {
              navigate(-1);
            }}
            className="w-100 mt-2"
          >
            Cancel
          </Button>
          {success && (
            <Message variant="success">Payment Was Successful</Message>
          )}
        </Form>
      )}
    </FormContainer>
  );
};

export default EnterCardInformationPage;
