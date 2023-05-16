import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import HomePage from "./pages/HomePage/HomePage";
import { Routes, Route } from "react-router-dom";
import RatingPage from "./pages/RatingPage/RatingPage";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rating" element={<RatingPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
