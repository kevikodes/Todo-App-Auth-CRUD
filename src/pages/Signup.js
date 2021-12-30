import React, { useRef } from "react";
import Login from "../components/Login";
import { auth, db } from "../utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  //Holds two useRefs
  const emailRef = useRef();
  const passwordRef = useRef();

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      ).then(async (cred) => {
        console.log(cred);
        await setDoc(doc(db, "users", `${cred.user.uid}`), {
          tasks: [
            {
              text: "Create your first TODO",
              status: true,
            },
          ],
        });
        if (cred) {
          navigate("/dashboard");
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <Login
        title="Sign Up"
        button="Sign Up"
        href="/"
        link="Sign in"
        headerStatement="Already have an account?"
        emailInput={emailRef}
        passwordInput={passwordRef}
        btnFunction={register}
      />
    </div>
  );
};

export default Signup;
