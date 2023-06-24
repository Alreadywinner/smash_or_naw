import { Button, Label, TextInput } from 'flowbite-react';
import { useRef, useState } from 'react';
import AddPostForm from '../../components/AddPostForm/AddPostForm';
import { useAdminLoginMutation } from '../../redux/slices/adminSlice';
import { setCredentials } from '../../redux/slices/authSlice';
import Toast from '../../components/Toast/Toast';
import Loader from '../../components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from '../../utils/readCookie';

const AdminLogin = () => {
  const [showToast, setShowToast] = useState({
    visible: false,
    type: '',
    msg: '',
  });
  const adminEmail = useRef('');
  const adminPassword = useRef('');
  const dispatch = useDispatch();

  const [login, { isLoading }] = useAdminLoginMutation();

  const adminLogin = async (e) => {
    e.preventDefault();
    const email = adminEmail.current.value.trim();
    const password = adminPassword.current.value.trim();
    if (email === '' && password === '') {
      setShowToast({
        visible: true,
        type: 'error',
        msg: 'Please enter all entities',
      });
      return;
    }
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
    } catch (err) {
      console.log('In error', err);
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
    <>
      {showToast.visible && (
        <Toast
          message={showToast.msg}
          onClose={onToastClick}
          type={showToast.type}
        />
      )}
      <div className="h-screen flex flex-col items-center justify-center">
        <p className="text-3xl font-bold mt-10">Login For Admin</p>
        <form
          className="flex max-w-md flex-col gap-4 h-full w-3/4 mt-10"
          onSubmit={adminLogin}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              ref={adminEmail}
              placeholder="name@flowbite.com"
              required
              type="email"
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput
              id="password1"
              ref={adminPassword}
              placeholder="password"
              required
              type="password"
            />
          </div>
          <Button className="bg-red-400 hover:bg-red-500 mt-8" type="submit">
            {isLoading ? <Loader /> : 'Login'}
          </Button>
        </form>
      </div>
    </>
  );
};

const AdminPage = () => {
  const myCookieValue = getCookie('jwt');
  const { userInfo } = useSelector((state) => state.auth);

  return <>{myCookieValue || userInfo ? <AddPostForm /> : <AdminLogin />}</>;
};

export default AdminPage;
