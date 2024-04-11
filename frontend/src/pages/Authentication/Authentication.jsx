import Grid from "@mui/material/Grid";
import { GoogleLogin } from "@react-oauth/google";
import Button from "@mui/material/Button";
import "./Authentication.css";

function Authentication() {
  return (
    <div>
      <Grid className="overflow-y-hidden" container>
        <div className="leftPartAuth">
          
        </div>
        <div className="rightPartAuth">
          <h1>¿QUÉ ESTÁ PASANDO?</h1>
          <h2>ENTRA EN DOGGIEDIARY HOY</h2>
          <section className="registerAuth">
            <GoogleLogin width={350}/>
            <p>O</p>
            <Button>CREAR UNA CUENTA</Button>
          </section>
          <section className="loginAuth">
            <h3>¿YA TIENES UNA CUENTA?</h3>
            <Button>INICIAR SESIÓN</Button>
          </section>
        </div>
      </Grid>
    </div>
  );
}

export default Authentication;
