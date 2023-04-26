import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import LinkContianer from "react-router-bootstrap/LinkContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import axios from "axios";
import EditUserProfileForm from "../components/EditUserProfileForm";

const EditUserProfilePage = () => {
  const user = useSelector((state) => state.user);
  const { loading, userInfo, error } = user;
  const [message, setMessage] = useState("");
  const [userProfile, setUserProfile] = useState(null)
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [orders, setOrders] = useState(null);
  const [pageError, setPageError] = useState('')
  const navigate = useNavigate()

  const [ordersError, setOrdersError] = useState(null);

  const fetchMyOrders = async (token) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/orders/get-my-orders`,
        {
          headers: {
            Authorization: `JWT ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setOrders(data);
    } catch (err) {
      setOrdersError(err);
    }
  };

  const getUserProfile = async ({ userId, token }) => {
    try {
      const { data } = await axios.get(`api/users/get-profile/${userId}`, {
        headers: {
          Authorization: `JWT ${token}`,
          "Content-Type": "application/json",
        },
        baseURL: "http://localhost:8000/",
      });
      setUserProfile(data)
    } catch (err) {
      setPageError(err)
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      const token = userInfo.token;
      getUserProfile({ userId, token })
      fetchMyOrders(token);
    } else {
      setMessage("You are not authorized");
    }
  }, [userInfo, dispatch, userId]);

  return (
    <>
      <div className="w-100 p-4 px-2" style={{ border: "1px dotted #ddd" }}>
        <Link
          to="/"
          className="px-3"
          style={{ color: "#0095f6", textDecoration: "none" }}
        >
          Home
        </Link>
        <Link
          to="/all-products"
          className="px-3"
          style={{ color: "#0095f6", textDecoration: "none" }}
        >
          Products
        </Link>
      </div>
      <Row>
        {/* <strong>
              <p
                className="txt--blue"
                style={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={() => {
                  navigate(-1);
                }}
              >
                Go Back
              </p>
            </strong> */}
        <Col md={3}>
          <div className="mt-2">
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {pageError && <Message variant="danger">{pageError}</Message>}
            {ordersError && <Message variant="danger">{ordersError}</Message>}
          </div>
          {loading && <Loader />}
          {/* Loader appears for no reason (loading is true) */}
          {userProfile && !error && userInfo ? (
            <EditUserProfileForm
              userProfile={userProfile}
              userInfo={userInfo}
              userId={userId}
              loading={loading}
            />
          ) : (
            <Message variant="info">
              There was a problem loading this content
            </Message>
          )}
        </Col>
        <Col md={9} className="mt-2 p-4">
          <h2 className="font-family-secondary txt--black">MY ORDERS</h2>
          {ordersError ? (
            <Message variant="danger">{ordersError}</Message>
          ) : (
            <Table
              striped
              responsive
              className="table-sm border-lt mt-4"
              style={{ verticalAlign: "middle" }}
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Delivered</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-2">{order.id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>${order.totalPrice}</td>
                      <td>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <i
                            className="fa fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td>
                        {order.isDelivered
                          ? order.deliveredAt.substring(0, 10)
                          : "Not Delivered"}
                      </td>
                      <td>
                        <LinkContianer
                          to={`/orders/${order.id}`}
                          style={{ color: "#fff" }}
                        >
                          <Button className="btn-sm" variant="blue">
                            Details
                          </Button>
                        </LinkContianer>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  );
};

export default EditUserProfilePage;
