import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import TermsAndConditions from "./components/TermsAndConditions/TermsAndConditions";
import HomePage from "./pages/HomePage/HomePage";
import { Routes, Route } from "react-router-dom";
import RatingPage from "./pages/RatingPage/RatingPage";
import ContactUs from "./pages/ContactUs/ContactUs";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rating" element={<RatingPage />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
