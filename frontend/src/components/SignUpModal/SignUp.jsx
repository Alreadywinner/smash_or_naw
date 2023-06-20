import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useRegisterMutation } from '../../redux/slices/userApiSlice';
import { setCredentials } from '../../redux/slices/authSlice';
import Toast from '../Toast/Toast';
import { useRef, useState } from 'react';
import Loader from '../Loader/Loader';

const SignUp = ({ onClose, onLoginClick, visible }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const repeatPassRef = useRef();
  const nameRef = useRef();
  const [showToast, setShowToast] = useState('');

  const [register, { isLoading }] = useRegisterMutation();

  const handleClick = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const repeatPass = repeatPassRef.current.value.trim();
    const name = nameRef.current.value.trim();
    if (repeatPass !== password) {
      setShowToast(`Passwords don't match`);
      return;
    }
    if (name === '') {
      setShowToast(`Name cannot be empty`);
      return;
    }
    if (email) {
      const emailReg =
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;

      if (email === '' || !emailReg.test(email)) {
        setShowToast(`Please Enter a valid email`);
        return;
      }
    }
    try {
      const res = await register({ name, email, password }).unwrap();
      // we are using unwrap because login returns a promise so un wrapping it will make it easier to use
      onClose();
      navigate('/rating');
      dispatch(setCredentials({ ...res }));
    } catch (err) {
      setShowToast(err?.data?.message || err.error);
    }
  };

  const onToastClick = () => {
    setShowToast('');
  };

  return (
    <Modal show={visible} onClose={onClose}>
      {showToast !== '' && (
        <Toast message={showToast} onClose={onToastClick} error={true} />
      )}
      <Modal.Header>Sign Up</Modal.Header>
      <Modal.Body>
        <form className="flex flex-col gap-4" onSubmit={handleClick}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Your name" />
            </div>
            <TextInput
              id="name"
              type="text"
              ref={nameRef}
              placeholder="John Doe"
              required={true}
              shadow={true}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email2" value="Your email" />
            </div>
            <TextInput
              id="email2"
              type="email"
              ref={emailRef}
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
              ref={passwordRef}
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
              ref={repeatPassRef}
              required={true}
              shadow={true}
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="agree" />
            <Label htmlFor="agree">
              I agree with the &nbsp;
              <Link
                to={'/terms-and-conditions'}
                className="text-blue-600 hover:underline"
              >
                terms and conditions
              </Link>
            </Label>
          </div>
          <Button
            type="submit"
            className="bg-red-400 text-white hover:bg-red-500"
          >
            {isLoading ? <Loader /> : 'Register new account'}
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
  visible: PropTypes.bool.isRequired,
  onLoginClick: PropTypes.func.isRequired,
};

export default SignUp;
