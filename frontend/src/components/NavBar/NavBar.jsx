import { Navbar } from 'flowbite-react';
import { useState } from 'react';
import Auth from '../Auth/Auth';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../redux/slices/userApiSlice';
import { clearCredentials } from '../../redux/slices/authSlice';
import Toast from '../Toast/Toast';
import { getCookie } from '../../utils/readCookie';

const NavBar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const myCookieValue = getCookie('jwt');
  const [displayAuth, setDisplayAuth] = useState(false);
  const [showToast, setShowToast] = useState('');

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(clearCredentials());
      navigate('/');
    } catch (err) {
      setShowToast(err?.data?.message || err.error);
    }
  };
  const onToastClick = () => {
    setShowToast('');
  };
  return (
    <>
      {showToast !== '' && (
        <Toast message={showToast} onClose={onToastClick} error={true} />
      )}
      {displayAuth && <Auth />}
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand to="/">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold">
            Smash or Naw
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Link
            className="text-black md:hover:text-red-400 md:active:text-red-400"
            href="/"
            active="true"
          >
            Home
          </Link>
          <Link className="text-black md:hover:text-red-400" to="/">
            About
          </Link>
          <Link className="text-black md:hover:text-red-400" to="/">
            Services
          </Link>
          <Link className="text-black md:hover:text-red-400" to="/">
            Pricing
          </Link>
          <Link className="text-black md:hover:text-red-400" to="/contact">
            Contact
          </Link>
          <>
            {userInfo || myCookieValue ? (
              <Link
                className="text-black md:hover:text-red-400 hover:cursor-pointer"
                onClick={logoutHandler}
              >
                Logout
              </Link>
            ) : (
              <Link
                className="text-black md:hover:text-red-400 hover:cursor-pointer"
                onClick={() => setDisplayAuth(!displayAuth)}
              >
                Login
              </Link>
            )}
          </>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;
