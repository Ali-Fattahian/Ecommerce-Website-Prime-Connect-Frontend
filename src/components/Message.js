import React from "react";
import Alert from "react-bootstrap/Alert";

const Message = ({ variant, children, className }) => {
  return <Alert variant={variant} className={`${className}`}>{children}</Alert>;
};

export default Message;
