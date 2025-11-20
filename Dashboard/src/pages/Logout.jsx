import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/login");
  }, []);

  return null; // optional: show a spinner while logging out
}
