import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Authentication from "./pages/Authentication/Authentication";
import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "./store/Auth/action";

function App() {
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (jwt) {
      dispatch(getUserProfile(jwt));
      // Si es la primera vez que se inicia sesión después de cerrarla, recargar la página
      if (!localStorage.getItem("firstLogin")) {
        localStorage.setItem("firstLogin", "true");
        window.location.reload();
      } else {
        navigate("/");
      }
    } else {
      // Limpiar el indicador de primera sesión al cerrar sesión
      localStorage.removeItem("firstLogin");
    }
  }, [auth.jwt]);

  return (
    <Routes>
      <Route path="/*" element={auth.user ? <Home /> : <Authentication />} />
      <Route path="/messages" />
    </Routes>
  );
}

export default App;
