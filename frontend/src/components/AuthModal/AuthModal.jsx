import Box from "@mui/material/Box";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";
import { Button } from "@mui/base";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: 1,
};

export default function AuthModal({ open, handleClose }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = () => {
    const path = location.pathname === "/signup" ? "/signin" : "/signup";
    navigate(path);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="authModalContainer">
          <h2 className="titleAuthModal">
            {location.pathname === "/signup"
              ? "CREAR UNA CUENTA"
              : "INICIAR SESIÓN"}
          </h2>
          {location.pathname === "/signup" ? <SignupForm /> : <SigninForm />}
          <h2>
            {location.pathname === "/signup"
              ? "¿YA TIENES UNA CUENTA?"
              : "¿NO TIENES UNA CUENTA?"}
          </h2>
          <div
            className={
              location.pathname === "/signup"
                ? "signupButtonText"
                : "signinButtonText"
            }
          >
            <Button onClick={handleNavigate}>
              {location.pathname === "/signup"
                ? "INICIAR SESIÓN"
                : "CREAR UNA CUENTA"}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
