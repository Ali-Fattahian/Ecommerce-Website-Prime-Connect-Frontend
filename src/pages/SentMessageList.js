import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Message from "../components/Message";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import CheckIcon from "../icons/CheckIcon";
import EllipsesIcon from "../icons/EllipsesIcon";
import ClockIcon from "../icons/ClockIcon";

const SentMessageList = ({ refresh }) => {
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const config = useSelector((state) => state.config);
  const { baseURL } = config;
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [now, setNow] = useState(null);

  const readTheMessage = (id) => {
    navigate(`/admin/sent-messages-list/${id}`);
  };

  const deleteMessage = async (id) => {
    const token = userInfo.token;
    try {
      await axios.delete(`${baseURL}/users/messages/delete/${id}`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
      setNow(new Date());
    } catch {
      setError(
        "There was a problem deleting the message, Make sure you have a stable internet connection."
      );
    }
  };

  const fetchMessages = async () => {
    try {
      const token = userInfo.token;
      const { data } = await axios.get("/users/sent-messages", {
        headers: {
          Authorization: `JWT ${token}`,
          "Content-Type": "application/json",
        },
        baseURL: baseURL,
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
  }, [refresh, now]);

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
            <th className="text-center">
              <ClockIcon />
            </th>
            <th>READ</th>
            <th>MORE</th>
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
                    <CheckIcon color='green' />
                  ) : (
                    <CheckIcon color='red' />
                  )}
                </td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="primary"
                      style={{ color: "var(--bs-secondary)" }}
                      id="dropdown-basic"
                    >
                      <EllipsesIcon />
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

export default SentMessageList;
