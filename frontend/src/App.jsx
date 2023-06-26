import Footer from './components/Footer/Footer';
import NavBar from './components/NavBar/NavBar';
import TermsAndConditions from './components/TermsAndConditions/TermsAndConditions';
import HomePage from './pages/HomePage/HomePage';
import { Routes, Route, useLocation } from 'react-router-dom';
import RatingPage from './pages/RatingPage/RatingPage';
import ContactUs from './pages/ContactUs/ContactUs';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import AdminPage from './pages/AdminPage/AdminPage';
import AdPage from './pages/AdPage/AdPage';
import PostPage from './pages/PostPage/PostPage';

function App() {
  const location = useLocation();
  const { pathname } = location;
  const isRouteAdmin = pathname.includes('admin');

  return (
    <>
      {!isRouteAdmin && <NavBar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/login" element={<AdminPage />} />
        <Route path="/admin/Ad" element={<AdPage />} />
        <Route path="/admin/posts" element={<PostPage />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="/rating" element={<RatingPage />} />
        </Route>
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
      {!isRouteAdmin && <Footer />}
    </>
  );
}

export default App;
