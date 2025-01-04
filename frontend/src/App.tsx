import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import AdminRegister from "./pages/admin/register/Register";
import AdminLogin from "./pages/admin/login/Login";
import Home from "./pages/home/Home";
import Tool from "./pages/tool/Tool";
import IsAdmin from "./components/IsAdmin";
import IsLoggedIn from "./components/isLoggedIn";
import Navbar from "./components/navbar/Navbar";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={
            <IsLoggedIn>
              <Register />
            </IsLoggedIn>
          }
        />
        <Route
          path="/login"
          element={
            <IsLoggedIn>
              <Login />
            </IsLoggedIn>
          }
        />
        <Route
          path="/admin/register"
          element={
            <IsLoggedIn role="admin">
              <AdminRegister />
            </IsLoggedIn>
          }
        />
        <Route
          path="/admin/login"
          element={
            <IsLoggedIn role="admin">
              <AdminLogin />
            </IsLoggedIn>
          }
        />
        <Route
          path="/tool"
          element={
            <IsAdmin>
              <Tool />
            </IsAdmin>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
