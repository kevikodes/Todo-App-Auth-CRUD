import React, { useRef } from "react";
import Login from "../components/Login";
import { auth } from "../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const Signin = () => {
  //Holds two useRefs
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      ).then((res) => {
        console.log(res);
        window.location = "/dashboard";
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Login
        title="Sign In"
        button="Sign In"
        href="/signup"
        link="Sign up"
        headerStatement="Need an account?"
        emailInput={emailRef}
        passwordInput={passwordRef}
        btnFunction={login}
      />
    </div>
  );
};

export default Signin;
