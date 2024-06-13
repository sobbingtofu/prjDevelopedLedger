import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useLogInSignUpStore} from "../zustand/logInSignUpStore";

const Redirect = () => {
  const navigate = useNavigate();
  const isLoggedIn = useLogInSignUpStore((state) => state.isLoggedIn);
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    } else {
      navigate("/logIn");
    }
  });
  return <div>Redirect...</div>;
};

export default Redirect;
