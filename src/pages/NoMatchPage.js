import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import NavbarComponent from "../components/NavbarComponent";
import Footer from "../components/Footer";

const NoMatchPage = () => {
  const navigate = useNavigate();
  const goBackHandler = () => {
    navigate(-1);
  };

  return (
    <>
      <NavbarComponent />
      <div id="message-component__container">
        <Message variant="info" className="mt-2 text-center">
          The page you are looking for doesn't seem to exist{" "}
          <p
            onClick={goBackHandler}
            className="txt--blue d-inline-block"
            style={{ textDecoration: "underline", cursor: "pointer" }}
          >
            Go back
          </p>
        </Message>
      </div>
      <Footer fixed />
    </>
  );
};

export default NoMatchPage;
