import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Message from "../components/Message";
import Button from "react-bootstrap/esm/Button";

const SendMessagePage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const [error, setError] = useState(null);
  const [userList, setUserList] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState('');
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const messageInputHandler = (e) => {
    setMessage(e.target.value);
  };

  const fetchAdmins = async () => {
    const token = userInfo.token;
    try {
      const { data } = await axios.get("api/users/admin-list", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
        baseURL: "http://localhost:8000",
      });
      setUserList(data);
    } catch (err) {
      setError(err);
    }
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(selectedAdmin)
    const token = userInfo.token;
    if (message.length < 1) setError("Message can't be empty");
    const response = await axios.post(
      "api/users/send-message",
      {
        content: message.trim(),
        recipient: selectedAdmin,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
        baseURL: "http://localhost:8000",
      }
    );
    if (response.status === 201) {
      setSuccess(true);
      setMessage("");
      setSelectedAdmin('');
    }
  };

  useEffect(() => {
    if (!userInfo) navigate("/login");
    if (userInfo && !userInfo.isAdmin) navigate("/");
    fetchAdmins();
  }, []);
  return (
    <>
      <NavbarComponent />
      <Form
        onSubmit={formSubmitHandler}
        className="p-4 border-lt d-flex gap-4 flex-column"
        style={{ marginTop: "8rem" }}
      >
        <Form.Group id="admin-list">
          {error && <Message variant="danger">{error}</Message>}
          {success && (
            <Message variant="success">
              Your message was sent successfully
            </Message>
          )}
          <Form.Label
            className="font-family-secondary"
            style={{ fontSize: "1.5rem" }}
          >
            Choose an Admin
          </Form.Label>
          {/* <Form.Text style={{ color: "#e62020", fontSize: "12px", marginLeft: ".5rem" }}>
            * Use Control(Command) to select multiple choices or to deselect
            choices
          </Form.Text> */}
          <Form.Control
            required
            as="select"
            value={selectedAdmin}
            // onChange={(e) => {
            //   setSelectedAdmins(
            //     [].slice
            //       .call(e.target.selectedOptions)
            //       .map((item) => item.value)
            //   );
            // }}
            onChange={(e) => {
              setSelectedAdmin(e.target.value)
            }}
          >
            <option>-----------</option>
            {userList.map((user) => (
              <option value={user.id} key={user.id}>
                {user.fullname} | {user.email}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group id="send-message">
          <Form.Label
            className="font-family-secondary"
            style={{ fontSize: "1.5rem" }}
          >
            Message
          </Form.Label>
          <Form.Control
            placeholder="Write your message here..."
            required
            as="textarea"
            maxLength={450}
            value={message}
            onChange={messageInputHandler}
          />
        </Form.Group>
        <Form.Group>
          <Button type="submit" variant="blue" style={{color: "#fff"}}>
            Send
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default SendMessagePage;
