import React from "react";

const Button = ({ children }) => {
  return <button onClick={() => console.log('123')}>{children}</button>;
};

export default Button;
