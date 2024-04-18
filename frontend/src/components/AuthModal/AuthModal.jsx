import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";
import { Button } from "@mui/base";
import PropTypes from "prop-types";

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

export default function AuthModal({ open, handleClose, activeForm }) {
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
            {activeForm === "signup" ? "CREAR UNA CUENTA" : "INICIAR SESIÓN"}
          </h2>
          {activeForm === "signup" ? <SignupForm /> : <SigninForm />}
          <h2>
            {activeForm === "signup"
              ? "¿YA TIENES UNA CUENTA?"
              : "¿NO TIENES UNA CUENTA?"}
          </h2>
          <div
            className={
              activeForm === "signup" ? "signupButtonText" : "signinButtonText"
            }
          >
            <Button onClick={() => handleClose()}>
              {activeForm === "signup" ? "INICIAR SESIÓN" : "CREAR CUENTA"}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

AuthModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  activeForm: PropTypes.oneOf(["signup", "login"]).isRequired,
};
