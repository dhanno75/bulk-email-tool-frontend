import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/navigation/Navigation";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/login/Login";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import ResetPassword from "./components/resetPassword/ResetPassword";
import Home from "./components/home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./components/signup/Signup";
import { useEffect } from "react";
import Statistics from "./components/statistics/Statistics";
import ProtectedRoute from "./ProtectedRoutes";

function App() {
  // const navigate = useNavigate();
  // const isLoggedIn = localStorage.getItem("isLoggedIn");
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigate("/home");
  //   }
  // }, []);

  return (
    <div className="App">
      <Navigation />
      <ToastContainer />
      <Routes>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stats"
          element={
            <ProtectedRoute>
              {" "}
              <Statistics />{" "}
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
