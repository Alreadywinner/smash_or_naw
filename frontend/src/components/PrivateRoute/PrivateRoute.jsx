import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCookie } from '../../utils/readCookie';

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const myCookieValue = getCookie('jwt');
  return userInfo || myCookieValue ? <Outlet /> : <Navigate to="/" replace />;
};
export default PrivateRoute;
