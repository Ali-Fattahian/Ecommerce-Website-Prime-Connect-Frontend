import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Message from "../components/Message";
import Button from "react-bootstrap/Button";

const SentMessageList = ({ refresh }) => {
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const readTheMessage = (id) => {
    navigate(`/admin/sent-messages-list/${id}`);
  };

  const fetchMessages = async () => {
    try {
      const token = userInfo.token;
      const { data } = await axios.get("api/users/sent-messages", {
        headers: {
          Authorization: `JWT ${token}`,
          "Content-Type": "application/json",
        },
        baseURL: "http://localhost:8000",
      });
      setMessages(data);
    } catch (err) {
      setError(
        "There was a problem loading the messages, Make sure you have a stable internet connection"
      );
    }
  };

  useEffect(() => {
    if (!userInfo) navigate("/login");
    if (userInfo && userInfo.isAdmin) fetchMessages();
  }, [refresh]);

  return (
    <Container id="user-list__container">
      <h2
        className="txt--black font-family-secondary mt-3 mb-0"
        style={{ alignSelf: "flex-start" }}
      >
        Sent Messages
      </h2>
      {error && (
        <Message variant="danger" className="mt-4">
          {error}
        </Message>
      )}
      <Table
        striped
        responsive
        bordered
        className="border-lt mt-4 table-dark table-hover"
        id="user-list-table"
        style={{ verticalAlign: "middle" }}
      >
        <thead>
          <tr>
            <th>RECIPIENT</th>
            <th>TIME SENT</th>
            <th>READ</th>
            <th className="text-center">
              <i className="fa fa-ellipsis-h"></i>
            </th>
          </tr>
        </thead>
        {messages.length > 0 ? (
          <tbody>
            {messages.map((message) => (
              <tr key={message.id}>
                <td>{message.recipient.email}</td>
                <td>{message.createdAt.substring(0, 10)}</td>
                <td>
                  {message.isRead ? (
                    <i className="fa fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fa fa-check" style={{ color: "red" }}></i>
                  )}
                </td>
                <td
                  onClick={() => readTheMessage(message.id)}
                  style={{ cursor: "pointer" }}
                >
                  <Button style={{ color: "var(--bs-secondary)" }}>
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <p className="p-2 txt--gray">No Messages were found</p>
        )}
      </Table>
    </Container>
  );
};

export default SentMessageList;