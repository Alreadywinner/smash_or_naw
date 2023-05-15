import PropTypes from "prop-types";
import { useState } from "react";
import Login from "../LoginModal/Login";
import SignUp from "../SignUpModal/SignUp";

const Auth = ({ setIsLoggedIn }) => {
  const [loginModal, setLoginModal] = useState(true);
  const [signUpModal, setSignUpModal] = useState(false);
  if (signUpModal) {
    return (
      <SignUp
        onClose={() => setSignUpModal(false)}
        onClick={() => console.log("Apply signup func")}
        onLoginClick={() => {
          setLoginModal(true);
          setSignUpModal(false);
          setIsLoggedIn(false);
        }}
        visible={signUpModal}
      />
    );
  }
  return (
    <Login
      onClose={() => setLoginModal(false)}
      onClick={() => console.log("Apply login func")}
      onSignUpClick={() => {
        setSignUpModal(true);
        setLoginModal(false);
        setIsLoggedIn(false);
      }}
      visible={loginModal}
    />
  );
};

Auth.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default Auth;
