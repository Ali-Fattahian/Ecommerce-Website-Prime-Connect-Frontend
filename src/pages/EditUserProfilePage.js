import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Loader from "../components/Loader";
import Message from "../components/Message";
import axios from "axios";
import EditUserProfileForm from "../components/EditUserProfileForm";
import GetMyOrders from "../components/GetMyOrders";
import Footer from "../components/Footer";
import NavbarComponent from "../components/NavbarComponent";

const EditUserProfilePage = () => {
  const user = useSelector((state) => state.user);
  const { loading, userInfo, error } = user;
  const [message, setMessage] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [pageError, setPageError] = useState("");
  const navigate = useNavigate();
  const [orders, setOrders] = useState(null);
  const [ordersError, setOrdersError] = useState(null);

  const getUserProfile = async ({ userId, token }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/users/get-profile/${userId}`,
        {
          headers: {
            Authorization: `JWT ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setUserProfile(data);
    } catch (err) {
      setPageError(
        "There was a problem loading your profile information, Make sure you have a stable internet connection"
      );
    }
  };

  const fetchMyOrders = async () => {
    const token = userInfo.token;
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
      setOrdersError(
        "There was a problem loading your orders information, Make sure you have a stable internet connection"
      );
    }
  };

  useEffect(() => {
    if (!userInfo) navigate("/login");
    if (userInfo.isAdmin) {
      const token = userInfo.token;
      getUserProfile({ userId, token });
      if (userInfo.id === userId) {
        fetchMyOrders();
      }
    } else {
      setMessage("You are not authorized");
    }
  }, [userInfo, dispatch, userId]);

  return (
    <>
      <NavbarComponent />
      <Row className={!orders && `no-orders-profile`} id="user-profile-page">
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
        {orders && (
          <Col md={9} className="mt-2 p-4">
            {ordersError ? (
              <Message variant="danger">{ordersError}</Message>
            ) : (
              <GetMyOrders orders={orders} />
            )}
          </Col>
        )}
      </Row>
      {orders ? <Footer /> : <Footer fixed />}
    </>
  );
};

export default EditUserProfilePage;
