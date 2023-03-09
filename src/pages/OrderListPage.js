import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import axios from "axios";
import NavbarComponent from "../components/NavbarComponent";

const OrderListPage = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.user)
  const { userInfo } = user;
  const [orders, setOrders] = useState([])
  const [error, setError] = useState(null)

  const deleteUserHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this user?"))
      console.log("delete", id);
  };

  const fetchOrders = async (token) => {
    try{
        const { data } = await axios.get('http://localhost:8000/api/orders', {
            headers: {
                'Authorization': `JWT ${token}`,
                'Content-Type': 'application/json'
            }
        })
        setOrders(data)
    } catch (err) {
        setError(err.message)
    }
  }

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      fetchOrders(userInfo.token)
    } else {
      navigate("/login");
    }
  }, [userInfo]);
  return (
    <>
      <NavbarComponent />
      <Container id="user-list__container">
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
              <th>DELIVERED AT</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.user.fullname}</td>
                <td>{order.paymentMethod}</td>
                <td>{order.isDelivered}</td>
                <td>{order.deliveredAt ? order.deliveredAt : 'Not Delivered Yet'}</td>
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
                        onClick={() => deleteUserHandler(user.id)}
                        style={{ fontSize: "20px" }}
                      ></i>
                    </Button>
                </td> {/* Ability to edit a product information */}
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default OrderListPage;
