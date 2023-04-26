import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import NavbarComponent from "../components/NavbarComponent";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Message from "../components/Message";
import axios from "axios";

const SentMessageDetailPage = () => {
  const [message, setMessage] = useState(null);
  const { messageId } = useParams();
  const [error, setError] = useState("");
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const navigate = useNavigate();

  const fetchMessage = async () => {
    try {
      const token = userInfo.token;
      const { data } = await axios.get(
        `api/users/sent-messages/${messageId}`,
        {
          headers: {
            Authorization: `JWT ${token}`,
            "Content-Type": "application/json",
          },
          baseURL: "http://localhost:8000",
        }
      );
      setMessage(data);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    if (!userInfo) navigate("/login");
    if(userInfo.isAdmin)
      fetchMessage();
  }, []);

  return (
    <>
      <NavbarComponent />
      {message && message.content.length > 0 ? <Container style={{ marginTop: "6rem" }}>
        {error && <Message variant="danger">{error}</Message>}
          <section
            id='message-section'
            className="mb-3 mt-3 border-lt"
          >
            <div
              className="pb-2 border-bottom-lt"
            >
              <strong>From: </strong>
              <span className="font-family-secondary">
                {message.sender.email}
              </span>
            </div>
            <div className="p-2 border-bottom-lt">
              <p style={{ fontSize: '12px', margin: '4px 0', color: '#222' }}>{message.content}</p>
            </div>
            <div className="pt-2">
              <small className="txt--black">{message.createdAt.substring(0, 10)}</small>
            </div>
          </section>
      </Container> : <p style={{ marginTop: "6rem", textAlign: 'center' }} className="txt--gray">The message was not found</p>} 
      {/* p on smaller screens is not looking good */}
    </>
  );
};

export default SentMessageDetailPage;
