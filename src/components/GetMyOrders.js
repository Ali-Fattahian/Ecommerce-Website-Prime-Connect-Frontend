import React from "react";
import Table from "react-bootstrap/Table";
import LinkContianer from "react-router-bootstrap/LinkContainer";
import Button from "react-bootstrap/Button";


const GetMyOrders = ({ orders }) => {
  return (
    <>
      <h2 className="font-family-secondary txt--black">MY ORDERS</h2>
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
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-2">{order.id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid && order.paidAt ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className="fa fa-times" style={{ color: "red" }}></i>
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
    </>
  );
};

export default GetMyOrders;
