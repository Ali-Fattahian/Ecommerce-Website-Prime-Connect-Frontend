import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Message from "../components/Message";
import Dropdown from "react-bootstrap/Dropdown";

const ReceivedMessageList = () => {
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [now, setNow] = useState(null);

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
      setError(
        "There was a problem changing your message's status, Make sure you have a stable internet connection"
      );
    }
  };

  const deleteMessage = async (id) => {
    const token = userInfo.token;
    try {
      await axios.delete(
        `http://localhost:8000/api/users/messages/delete/${id}`,
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );
      setNow(new Date());
    } catch {
      setError(
        "There was a problem deleting the message, Make sure you have a stable internet connection."
      );
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
      setError(
        "There was a problem loading the messages, Make sure you have a stable internet connection"
      );
    }
  };

  useEffect(() => {
    if (!userInfo) navigate("/login");
    if (userInfo && userInfo.isAdmin) fetchMessages();
  }, [now]);

  return (
    <Container id="user-list__container">
      <h2
        className="txt--black font-family-secondary mt-3 mb-0"
        style={{ alignSelf: "flex-start" }}
      >
        Received Messages
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
            <th>SENDER</th>
            <th className="text-center">
              <i className="far fa-clock"></i>
            </th>
            <th>READ</th>
            <th className="text-center">MORE</th>
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
                <td>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="primary"
                      style={{ color: "var(--bs-secondary)" }}
                      id="dropdown-basic"
                    >
                      <i className="fa fa-ellipsis-h"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => readTheMessage(message.id)}>
                        <Button
                          variant="dark-blue"
                          className="w-100"
                          style={{
                            color: "var(--bs-secondary)",
                          }}
                        >
                          Details
                        </Button>
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => deleteMessage(message.id)}>
                        <Button variant="danger" className="w-100">
                          Delete
                        </Button>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
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

export default ReceivedMessageList;
