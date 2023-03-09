import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getOrderDetail } from "../store/slices/orderSlice";

const OrderPage = () => {
  const { orderId } = useParams();
  const orders = useSelector((state) => state.orders);
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const { error, orderDetail, loading } = orders;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let itemsPrice;

  if (!loading && !error) {
    itemsPrice = orderDetail.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }

  useEffect(() => {
    if (!orderDetail || orderDetail.id !== Number(orderId)) {
      const token = userInfo.token;
      dispatch(getOrderDetail({orderId, token}));
    }
    if (userInfo.id !== orderDetail.user.id || userInfo.isAdmin !== true) {
      // Only admin and the owner of order can see this page
      navigate(-1);
    }
  }, [orderDetail, orderId]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      {orderDetail && <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2 className="font-family-secondary">ORDER: {orderDetail.id}</h2>
              <p><strong>Name: </strong><span className="txt--gray">{orderDetail.user.fullname}</span></p>
              <p><strong>Email: </strong><a href={`mailto:${orderDetail.user.email}`}>{orderDetail.user.email}</a></p>
              <p>
                <strong>SHIPPING: </strong>
                <span className="txt--gray">{orderDetail.shippingAddress.address},{" "}
                {orderDetail.shippingAddress.city}
                {"  "}
                {orderDetail.shippingAddress.postalCode}
                {"  "}
                {orderDetail.shippingAddress.country}</span>
              </p>

              {orderDetail.isDelivered ? (
                <Message variant='success'>Delivered on {orderDetail.deliveredAt}</Message>
              ): (
                <Message variant='info'>Not delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2 className="font-family-secondary">PAYMENT METHOD</h2>
              <p>
                <strong>Method: </strong>
                <span className="txt--gray">{orderDetail.paymentMethod}</span>
              </p>
              {orderDetail.isPaid ? (
                <Message variant='success'>Paid on {orderDetail.paidAt}</Message>
              ): (
                <Message variant='info'>Not paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2 className="font-family-secondary">ORDER ITEMS</h2>
              {orderDetail.orderItems.length === 0 ? (
                <Message variant="info">
                  Order is empty <Link to="/products">Products</Link>
                </Message>
              ) : (
                <ListGroup variant="flush">
                  {orderDetail.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row className="p-4">
                        <Col md={1}>
                          <Image
                            src={`http://localhost:8000${item.image}`}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} * ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2 className="font-family-secondary">ORDER SUMMARY</h2>
              </ListGroup.Item>
              {itemsPrice && (
                <ListGroup.Item>
                  <Row>
                    <Col>Items:</Col>
                    <Col>${itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${orderDetail.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${orderDetail.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>${orderDetail.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {error && <ListGroup.Item>
                <Message variant="danger">{error}</Message>
              </ListGroup.Item>}
            </ListGroup>
          </Card>
        </Col>
      </Row>}
    </div>
  );
};

export default OrderPage;