import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Authentication from "./pages/Authentication/Authentication";
import "./App.css";

function App() {
  const isAuthenticated = false;

  return (
    <Routes>
      <Route
        path="/*"
        element={isAuthenticated ? <Home /> : <Authentication />}
      />
      <Route path="/messages" />
    </Routes>
  );
}

export default App;
