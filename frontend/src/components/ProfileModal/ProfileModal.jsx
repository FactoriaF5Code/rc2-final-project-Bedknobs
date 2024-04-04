import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useFormik } from "formik";
import { Avatar, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./ProfileModal.css";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  paddingTop: 3.5,
  paddingBottom: 3.5,
  paddingLeft: 5,
  paddingRight: 5,
  outline: "none",
  borderRadius: 3,
};

function ProfileModal({handleOpen, handleClose}) {
  const [uploading, setUploading] = useState(false);
  

  const handleSubmit = (values) => {
    console.log("handle submit", values);
  };

  const handleImageChange = (event) => {
    setUploading(true);
    const { name } = event.target;
    const file = event.target.files[0];
    formik.setFieldValue(name, file);
    setUploading(false);
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      bio: "",
      backgroundImage: "",
      image: "",
    },
    onSubmit: handleSubmit,
  });
  return (
    <div>
      <Modal
        open={handleOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <section className="modalHeader">
              <div className="closeModal">
                <IconButton onClick={handleClose} aria-label="delete">
                  <CloseIcon />
                </IconButton>
                <p>Editar perfil</p>
              </div>
              <Button type="submit">Guardar</Button>
            </section>
            <section>
              <React.Fragment>
                <div className="relative">
                  <div>
                    <img
                      className="modalCoverImg"
                      src="https://cdn.pixabay.com/photo/2023/10/23/17/10/landscape-8336497_960_720.jpg"
                      alt="Portada"
                    />
                    <input
                      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                      type="file"
                      name="backgroundImage"
                      onChange={handleImageChange}
                    />
                  </div>
                  <div className="modalProfileImg">
                    <Avatar src="https://cdn.pixabay.com/photo/2023/09/22/17/59/dog-8269584_640.jpg" />
                    <input
                      type="file"
                      className="absolute top-[5vw] left-[1.5vw] w-[4.5vw] h-[4.5vw] opacity-0 cursor-pointer"
                      onChange={handleImageChange}
                      name="image"
                    />
                  </div>
                </div>
              </React.Fragment>
              <div className="infoModal">
                <TextField
                  className="nameModal"
                  fullWidth
                  id="fullName"
                  name="fullName"
                  label="Nombre completo"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.fullName && Boolean(formik.errors.fullName)
                  }
                  helperText={formik.touched.fullName && formik.errors.fullName}
                />
                <TextField
                  className="bioModal"
                  fullWidth
                  multiline
                  rows={4}
                  id="bio"
                  name="bio"
                  label="Bio"
                  value={formik.values.bio}
                  onChange={formik.handleChange}
                  error={formik.touched.bio && Boolean(formik.errors.bio)}
                  helperText={formik.touched.bio && formik.errors.bio}
                />
                <div>
                  <p className="birthModalTitle">
                    Fecha de nacimiento - Editar
                  </p>
                  <p>Octubre 26, 1999</p>
                </div>
              </div>
            </section>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default ProfileModal;
