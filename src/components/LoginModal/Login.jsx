import { Button, Label, Modal, TextInput } from "flowbite-react";
import PropTypes from "prop-types";

const Login = ({ onClose, onClick, onSignUpClick, visible }) => {
  return (
    <Modal show={visible} onClose={onClose}>
      <Modal.Header>Login</Modal.Header>
      <Modal.Body>
        <form className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email2" value="Your email" />
            </div>
            <TextInput
              id="email2"
              type="email"
              placeholder="name@gmail.com"
              required={true}
              shadow={true}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password2" value="Your password" />
            </div>
            <TextInput
              id="password2"
              type="password"
              required={true}
              shadow={true}
            />
          </div>
          <Button
            type="submit"
            className="bg-red-400 text-white hover:bg-red-500"
            onClick={onClick}
          >
            Login
          </Button>
        </form>
      </Modal.Body>
      <Modal.Footer className="flex items-center justify-center flex-col gap-3">
        <p className="text-semibold">Dont have an account ?</p>
        <Button
          className="bg-red-400 text-white hover:bg-red-500"
          onClick={onSignUpClick}
        >
          Sign Up
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

Login.propTypes = {
  onClose: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  onSignUpClick: PropTypes.func.isRequired,
};

export default Login;
