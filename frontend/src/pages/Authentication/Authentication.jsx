import Grid from "@mui/material/Grid";
import { GoogleLogin } from "@react-oauth/google";
import Button from "@mui/material/Button";
import "./Authentication.css";
import AuthModal from "../../components/AuthModal/AuthModal";
import { useState } from "react";

function Authentication() {
  const [openAuthModel, setOpenAuthModel] = useState(false);
  const [activeForm, setActiveForm] = useState("login");

  const handleOpenAuthModel = (formType) => {
    setOpenAuthModel(true);
    setActiveForm(formType);
  };

  const handleCloseAuthModel = () => setOpenAuthModel(false);

  return (
    <div>
      <Grid className="overflow-y-hidden" container>
        <div className="leftPartAuth"></div>
        <div className="rightPartAuth">
          <h1>¿QUÉ ESTÁ PASANDO?</h1>
          <h2>ENTRA EN DOGGIEDIARY HOY</h2>
          <section className="registerAuth">
            <GoogleLogin width={350} />
            <p>O</p>
            <Button onClick={() => handleOpenAuthModel("signup")}>
              CREAR UNA CUENTA
            </Button>
          </section>
          <section className="loginAuth">
            <h3>¿YA TIENES UNA CUENTA?</h3>
            <Button onClick={() => handleOpenAuthModel("login")}>
              INICIAR SESIÓN
            </Button>
          </section>
        </div>
      </Grid>
      <AuthModal
        open={openAuthModel}
        handleClose={handleCloseAuthModel}
        activeForm={activeForm}
      />
    </div>
  );
}

export default Authentication;
