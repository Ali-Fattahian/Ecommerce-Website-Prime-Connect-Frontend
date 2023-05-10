import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { orderCreate } from "../store/slices/orderSlice";
import Footer from "../components/Footer";

const PlaceOrderPage = () => {
  const orders = useSelector((state) => state.orders);
  const { success, error } = orders;
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lastOrder = JSON.parse(localStorage.getItem("lastOrder"));

  const itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.productQuantity, 0)
    .toFixed(2);
  const shippingPrice = (itemsPrice > 100 ? 0 : 10).toFixed(2);
  const taxPrice = (itemsPrice * 0.082).toFixed(2);
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);
  useEffect(() => {
    if (success) {
      navigate(`/orders/${lastOrder.id}`);
    }
  }, [success, navigate]);

  const placeOrderHandler = () => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) navigate("/login?redirect=/placeorder");
    dispatch(
      orderCreate({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    );
  };

  return (
    <div style={{ marginBottom: "70px" }}>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row id="checkout-page">
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2 className="font-family-secondary txt--black">Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}
                {"  "}
                {cart.shippingAddress.postalCode}
                {"  "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2 className="font-family-secondary txt--black">
                Payment Method
              </h2>
              <p>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2 className="font-family-secondary txt--black">Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message variant="info">
                  Your cart is empty <Link to="/all-products/">Products</Link>
                </Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row className="p-4" id="order-item">
                        <Col md={1}>
                          <Image
                            src={item.image1}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.productQuantity} * ${item.price} = $
                          {(item.productQuantity * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4} id="order-summary">
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2 className="font-family-secondary txt--black">
                  Order Summary
                </h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  style={{ color: "var(--bs-secondary)" }}
                  className="btn w-100"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Footer fixed />
    </div>
  );
};

export default PlaceOrderPage;
