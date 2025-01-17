import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

// bootstrap
//import Container from "react-bootstrap/Container";

// components
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";

//pages
import Home from "./components/pages/Home";
import Credits from "./components/pages/Credits";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/credits" element={<Credits />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
