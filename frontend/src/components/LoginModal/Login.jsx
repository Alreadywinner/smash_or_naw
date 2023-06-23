import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../../redux/slices/userApiSlice';
import { setCredentials } from '../../redux/slices/authSlice';
import PropTypes from 'prop-types';
import Toast from '../Toast/Toast';
import { useEffect, useRef, useState } from 'react';
import Loader from '../Loader/Loader';

const Login = ({ onClose, onSignUpClick, visible }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [showToast, setShowToast] = useState({
    visible: false,
    type: '',
    msg: '',
  });

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/rating');
    }
  }, [navigate, userInfo]);

  const handleClick = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    if (password === '') {
      setShowToast({
        visible: true,
        type: 'error',
        msg: `Passwords don't match`,
      });
      return;
    }
    if (email) {
      const emailReg =
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailReg.test(email)) {
        setShowToast({
          visible: true,
          type: 'error',
          msg: `Please Enter a valid email`,
        });
        return;
      }
    }
    try {
      const res = await login({ email, password }).unwrap();
      // we are using unwrap because login returns a promise so un wrapping it will make it easier to use
      onClose();
      navigate('/rating');
      dispatch(setCredentials({ ...res }));
    } catch (err) {
      setShowToast({
        visible: true,
        type: 'error',
        msg: err?.data?.message || err.error || 'Unexpected Error Occurred',
      });
    }
  };

  const onToastClick = () => {
    setShowToast({
      visible: false,
      type: '',
      msg: '',
    });
  };

  return (
    <Modal show={visible} onClose={onClose}>
      {showToast.visible && (
        <Toast
          message={showToast.msg}
          onClose={onToastClick}
          type={showToast.type}
        />
      )}
      <Modal.Header>Login</Modal.Header>
      <Modal.Body>
        <form className="flex flex-col gap-4" onSubmit={handleClick}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email2" value="Your email" />
            </div>
            <TextInput
              id="email2"
              type="email"
              placeholder="name@gmail.com"
              ref={emailRef}
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
              ref={passwordRef}
              required={true}
              shadow={true}
            />
          </div>
          <Button
            type="submit"
            className="bg-red-400 text-white hover:bg-red-500"
          >
            {isLoading ? <Loader /> : 'Login'}
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
  visible: PropTypes.bool.isRequired,
  onSignUpClick: PropTypes.func.isRequired,
};

export default Login;
