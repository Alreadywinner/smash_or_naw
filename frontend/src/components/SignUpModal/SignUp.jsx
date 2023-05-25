import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SignUp = ({ onClose, onClick, onLoginClick, visible }) => {
  return (
    <Modal show={visible} onClose={onClose}>
      <Modal.Header>Sign Up</Modal.Header>
      <Modal.Body>
        <form className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email2" value="Your email" />
            </div>
            <TextInput
              id="email2"
              type="email"
              placeholder="name@flowbite.com"
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
          <div>
            <div className="mb-2 block">
              <Label htmlFor="repeat-password" value="Repeat password" />
            </div>
            <TextInput
              id="repeat-password"
              type="password"
              required={true}
              shadow={true}
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="agree" />
            <Label htmlFor="agree">
              I agree with the &nbsp;
              <Link
                to={"/terms-and-conditions"}
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                terms and conditions
              </Link>
            </Label>
          </div>
          <Button
            type="submit"
            className="bg-red-400 text-white hover:bg-red-500"
            onClick={onClick}
          >
            Register new account
          </Button>
        </form>
      </Modal.Body>
      <Modal.Footer className="flex items-center justify-center flex-col gap-3">
        <p className="text-semibold">Already have an account ?</p>
        <Button
          onClick={onLoginClick}
          className="bg-red-400 text-white hover:bg-red-500"
        >
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

SignUp.propTypes = {
  onClose: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  onLoginClick: PropTypes.func.isRequired,
};

export default SignUp;
