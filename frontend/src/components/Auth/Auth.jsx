import { useState } from "react";
import Login from "../LoginModal/Login";
import SignUp from "../SignUpModal/SignUp";

const Auth = () => {
  const [loginModal, setLoginModal] = useState(true);
  const [signUpModal, setSignUpModal] = useState(false);
  if (signUpModal) {
    return (
      <SignUp
        onClose={() => setSignUpModal(false)}
        onLoginClick={() => {
          setLoginModal(true);
          setSignUpModal(false);
        }}
        visible={signUpModal}
      />
    );
  }
  return (
    <Login
      onClose={() => setLoginModal(false)}
      onSignUpClick={() => {
        setSignUpModal(true);
        setLoginModal(false);
      }}
      visible={loginModal}
    />
  );
};

export default Auth;
