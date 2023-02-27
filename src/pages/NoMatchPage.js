import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import NavbarComponent from "../components/NavbarComponent";

const NoMatchPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <NavbarComponent />
      <Message variant="info" className='mt-2 text-center'>
        The page you are looking for doesn't seem to exist{" "}
        <Link to={navigate(-1)}>Go back</Link>
      </Message>
    </>
  );
};

export default NoMatchPage;
