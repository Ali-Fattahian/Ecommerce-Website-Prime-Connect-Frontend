import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {
  orderDelete,
  updateOrderToDelivered,
} from "../store/slices/orderSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";
import SideNavbar from "../components/SideNavbar";
import classes from "./Admin/Admin.module.css";

const OrderListPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const orderState = useSelector((state) => state.orders);
  const { loading, error } = orderState;
  const { userInfo } = user;
  const [orders, setOrders] = useState([]);
  const [error1, setError] = useState(null);
  const dispatch = useDispatch();
  const [refreshPage, setRefreshPage] = useState(null);

  const setToDeliveredHandler = (orderId) => {
    const token = userInfo.token;
    if (
      window.confirm("Are you sure you want to change this order to delivered?")
    ) {
      dispatch(updateOrderToDelivered({ orderId, token }));
      setRefreshPage(new Date());
    }
  };

  const deleteOrderHandler = (orderId) => {
    const token = userInfo.token;
    if (window.confirm("Are you sure you want to delete this order?")) {
      dispatch(orderDelete({ orderId, token }));
      setRefreshPage(new Date());
    }
  };

  const fetchOrders = async (token) => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/orders", {
        headers: {
          Authorization: `JWT ${token}`,
          "Content-Type": "application/json",
        },
      });
      setOrders(data);
    } catch (err) {
      setError(
        "There was a problem loading the orders, Make sure you have a stable internet connection"
      );
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      fetchOrders(userInfo.token);
    } else {
      navigate("/login");
    }
  }, [userInfo, navigate, refreshPage]);
  return (
    <div className={classes["admin-page"]}>
      <div className={classes["admin-page-left"]}>
        <SideNavbar />
      </div>
      <div
        className={classes["admin-page-right"]}
        style={{ paddingTop: "2rem", paddingRight: "2rem" }}
      >
        {error1 && <Message variant="info">{error1}</Message>}
        {error && <Message variant="info">{error}</Message>}
        {loading && !error1 && !error && <Loader />}
        {!error && !error1 && !loading && (
          <Container id="user-list__container" style={{ maxWidth: "960px" }}>
            <h1 className="mt-4 font-family-secondary txt--black">ORDERS</h1>
            <Table
              striped
              bordered
              hover
              responsive
              className="table-sm mt-4"
              id="user-list-table"
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>USER</th>
                  <th>METHOD</th>
                  <th>DELIVERED</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.user.fullname}</td>
                    <td>{order.paymentMethod}</td>
                    <td>
                      {order.deliveredAt
                        ? order.deliveredAt.substring(0, 10)
                        : "Not Delivered Yet"}
                    </td>
                    <td>
                      <Button
                        style={{
                          color: "black",
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                        className="btn-sm"
                      >
                        <i
                          className="fa fa-trash"
                          onClick={() => deleteOrderHandler(order.id)}
                          style={{ fontSize: "20px" }}
                        ></i>
                      </Button>
                      {!order.isDelivered && (
                        <Button
                          variant="light"
                          className="btn-sm"
                          onClick={() => {
                            setToDeliveredHandler(order.id);
                          }}
                        >
                          <i
                            className="fa fa-edit"
                            style={{ fontSize: "20px" }}
                            title="Set To Delivered"
                          ></i>
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        )}
      </div>
    </div>
  );
};

export default OrderListPage;
