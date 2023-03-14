import { useNavigate } from "react-router-dom";

export default function ProtectedRoute(props) {
  const navigate = useNavigate();
  let isLoggedIn = localStorage.getItem("isLoggedIn") || "false";

  if (isLoggedIn === "true") {
    return props.children;
  } else {
    navigate("/login");
  }
}
