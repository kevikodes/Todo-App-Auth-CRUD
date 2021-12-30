import React from "react";
import "../styles/Login.css";

const Login = ({
  title,
  button,
  href,
  link,
  headerStatement,
  emailInput,
  passwordInput,
  btnFunction,
}) => {
  return (
    <div className="login">
      <div className="login-container">
        <h1 className="login-heading">{title}</h1>
        <input
          className="login-email"
          ref={emailInput}
          type="email"
          placeholder="Email..."
        />
        <input
          ref={passwordInput}
          type="password"
          className="login-password"
          placeholder="Password..."
        />
        <button className="login-button" onClick={btnFunction}>
          {button}
        </button>
        <div className="links">
          <p>{headerStatement}</p>
          <a href={href}>{link}</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
