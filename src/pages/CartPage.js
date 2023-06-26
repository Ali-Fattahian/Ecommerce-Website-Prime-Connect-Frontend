import React from "react";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart, updateCart } from "../store/slices/cartSlice";
import Message from "../components/Message";
import Footer from "../components/Footer";
import NavbarComponent from "../components/NavbarComponent";
import TrashIcon from "../icons/TrashIcon";

const CartPage = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <>
      <NavbarComponent />
      <Row className="p-4" id="cart-page">
        <Col md={8}>
          <h1 className="mx-3 txt--black font-family-secondary">
            SHOPPING CART
          </h1>
          {cartItems.length === 0 ? (
            <Message variant="info">
              Your cart is empty <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((productDetail) => (
                <ListGroup.Item
                  key={productDetail.id}
                  style={{ border: "none" }}
                >
                  <Row
                    className="p-2"
                    style={{
                      boxShadow: "0px 0px 27px 0px var(--bs-gray-200)",
                      alignItems: "center",
                    }}
                    id="cart-item"
                  >
                    <Col md={2}>
                      <Image
                        src={productDetail.image1}
                        alt={productDetail.name}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col md={3}>
                      <Link
                        to={`/products/${productDetail.id}`}
                        style={{ color: "var(--bs-blue)" }}
                      >
                        {productDetail.name}
                      </Link>
                    </Col>
                    <Col md={2}>${productDetail.price}</Col>
                    <Col md={3}>
                      <Form.Control
                        as="select"
                        value={productDetail.productQuantity}
                        onChange={(e) => {
                          const qty = Number(e.target.value);
                          return dispatch(updateCart({ productDetail, qty }));
                        }}
                      >
                        {[...Array(productDetail.countInStock).keys()].map(
                          (x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          )
                        )}
                      </Form.Control>
                    </Col>
                    <Col md={1}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(productDetail.id)}
                      >
                        <TrashIcon color='var(--bs-black)' />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4} id="proceed-to-checkout">
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2 className="txt--black font-family-secondary">
                  SUBTOTAL
                  <span className="px-2">
                    (
                    {cartItems.reduce(
                      (acc, item) => acc + item.productQuantity,
                      0
                    )}
                    )
                  </span>
                </h2>
                <h2 className="font-family-secondary">ITEMS</h2>$
                {cartItems
                  .reduce(
                    (acc, item) => acc + item.productQuantity * item.price,
                    0
                  )
                  .toFixed(2)}
              </ListGroup.Item>
            </ListGroup>
            <ListGroup.Item className="p-2">
              <Button
                type="button"
                className="btn w-100 rounded-0"
                style={{ color: "var(--bs-secondary)" }}
                disabled={cartItems.length === 0}
                onClick={() => navigate("/shipping")}
              >
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </Card>
        </Col>
      </Row>
      <Footer fixed />
    </>
  );
};

export default CartPage;
