import React, { useEffect, useState } from "react";
import NavbarComponent from "../components/NavbarComponent";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Message from "../components/Message";

const ReceivedMessageListPage = () => {
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const changeMessageStatusHandler = async ({ e, id }) => {
    try {
      const token = userInfo.token;
      await axios.put(
        `api/users/received-messages/change-message-status/${id}`,
        {
          isRead: e.target.checked,
        },
        {
          headers: {
            Authorization: `JWT ${token}`,
            "Content-Type": "application/json",
          },
          baseURL: "http://localhost:8000",
        }
      );
    } catch (err) {
      setError(err);
    }
  };

  const readTheMessage = (id) => {
    navigate(`/admin/received-messages-list/${id}`);
  };

  const fetchMessages = async () => {
    try {
      const token = userInfo.token;
      const { data } = await axios.get("api/users/received-messages", {
        headers: {
          Authorization: `JWT ${token}`,
          "Content-Type": "application/json",
        },
        baseURL: "http://localhost:8000",
      });
      setMessages(data);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    if (!userInfo) navigate("/login");
    if(userInfo.isAdmin)
      fetchMessages();
  }, []);

  return (
    <>
      <NavbarComponent />
      <Container id="user-list__container">
        <h1 className="mt-4 font-family-secondary txt--black">MESSAGES</h1>
        {error && (
          <Message variant="danger" className="mt-4">
            {error}
          </Message>
        )}
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
              <th>SENDER</th>
              <th>TIME SENT</th>
              <th>READ</th>
              <th>DETAILS</th>
            </tr>
          </thead>
          {messages.length > 0 ? (
            <tbody>
              {messages.map((message) => (
                <tr key={message.id}>
                  <td>{message.sender.email}</td>
                  <td>{message.createdAt.substring(0, 10)}</td>
                  <td>
                    {/* {" "}
                    {message.isRead ? (
                      <i className="fa fa-check" style={{ color: "green" }}></i>
                    ) : (
                      <i className="fa fa-check" style={{ color: "red" }}></i>
                    )} */}
                    <Form>
                      <Form.Check
                        style={{ cursor: "pointer" }}
                        type="switch"
                        id="message-is-read"
                        defaultChecked={message.isRead}
                        onChange={(e) => {
                          changeMessageStatusHandler({ e, id: message.id });
                        }}
                      />
                    </Form>
                  </td>
                  <td
                    onClick={() => readTheMessage(message.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="fa fa-ellipsis-h fa-2x"></i>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <p className="p-2 txt--gray">No Messages were found</p>
          )}
        </Table>
      </Container>
    </>
  );
};

export default ReceivedMessageListPage;
