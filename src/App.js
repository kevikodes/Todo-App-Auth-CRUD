import "./App.css";

import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

const data = [];

function App() {
  return (
    <BrowserRouter>
      <div className="dashboard">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
