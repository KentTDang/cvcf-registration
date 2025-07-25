import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
