import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import NavbarComponent from "../components/NavbarComponent";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Message from "../components/Message";
import axios from "axios";

const ReceivedMessageDetailPage = () => {
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
        `api/users/received-messages/${messageId}`,
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
      setError(
        "There was a problem loading the message, Make sure you have a stable internet connection"
      );
    }
  };

  useEffect(() => {
    if (!userInfo) navigate("/login");
    if (userInfo.isAdmin) fetchMessage();
  }, []);

  return (
    <>
      <NavbarComponent />
      {message && message.content.length > 0 ? (
        <Container style={{ marginTop: "7rem" }} className="d-flex">
          {error && <Message variant="danger">{error}</Message>}
          {/* <section id="message-section" className="mb-3 mt-3 border-lt"> */}
          <section className="notebook">
            <div className="message-date-created">
              <div>
                <span className="txt--gray">Year:</span>
                <span className="txt--black">
                  {message.createdAt.substring(0, 4)}
                </span>
              </div>
              <div>
                <span className="txt--gray">Month:</span>
                <span className="txt--black">
                  {message.createdAt.substring(5, 7)}
                </span>
              </div>
              <div>
                <span className="txt--gray">Day:</span>
                <span className="txt--black">
                  {message.createdAt.substring(8, 10)}
                </span>
              </div>
            </div>
            <div className="pb-2">
              <strong>From: </strong>
              <a
                className="font-family-secondary"
                href={`mailto:${message.sender.email}`}
              >
                {message.sender.email}
              </a>
            </div>
            <div className="p-2" style={{ marginTop: "38px" }}>
              <p className="message-content">- {message.content}</p>
            </div>
          </section>
        </Container>
      ) : (
        <p
          style={{ marginTop: "6rem", textAlign: "center" }}
          className="txt--gray"
        >
          The message was not found
        </p>
      )}
      {/* p on smaller screens is not looking good */}
    </>
  );
};

export default ReceivedMessageDetailPage;
