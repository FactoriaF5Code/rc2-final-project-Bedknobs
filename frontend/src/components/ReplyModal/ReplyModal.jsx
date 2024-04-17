import { Avatar } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageIcon from "@mui/icons-material/Image";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useFormik } from "formik";
import "./ReplyModal.css";
import { useDispatch, useSelector } from "react-redux";
import { createPostReply } from "../../store/Post/Action";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import PropTypes from "prop-types";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
  outline: "none",
};

function ReplyModal({ handleClose, open, post }) {
  // eslint-disable-next-line no-unused-vars
  const [uploadingImage, setUploadingImage] = useState();
  // eslint-disable-next-line no-unused-vars
  const [selectedImage, setSelectedImage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);


  const handleSubmit = (values) => {
    dispatch(createPostReply(values));
    handleClose();
    console.log("handle submit", values);
  };

  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
      postId: post?.id,
    },
    onSubmit: handleSubmit,
  });

  const handleSelectImage = async (event) => {
    setUploadingImage(true);
    const imgUrl = await uploadToCloudinary(event.target.files[0]);
    formik.setFieldValue("image", imgUrl);
    setSelectedImage(imgUrl);
    setUploadingImage(false);
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <div className="replyModalPost">
              <Avatar
                onClick={() => navigate(`/account/${6}`)}
                alt="username"
                src={post?.user?.image}
              />
              <div>
                <div className="postUser">
                  <section className="postUsername">
                    <span>{post?.user?.fullName}</span>
                    <span className="opacity-50">@{post?.user?.fullName.split(" ").join("_").toLowerCase()} . 2m</span>
                  </section>
                </div>
                <div className="postInfoContainer">
                  <section
                    onClick={() => navigate(`/post/${2}`)}
                    className="postInfo"
                  >
                    <p>{post?.content}</p>
                  </section>
                </div>
              </div>
            </div>
            <section className="newEntrieContainer">
              <Avatar
                alt="username"
                src={auth.user?.image}
              />
              <div>
                <form onSubmit={formik.handleSubmit}>
                  <div>
                    <input
                      className="entrieInput"
                      type="text"
                      name="content"
                      placeholder="¿Qué estás pensando?"
                      {...formik.getFieldProps("content")}
                    />
                    {formik.errors.content && formik.touched.content && (
                      <span className="text-red-400">
                        {formik.errors.content}
                      </span>
                    )}
                  </div>
                  <div className="replyModalContainer">
                    <div className="entrieOptions">
                      <label className="imageOption">
                        <ImageIcon className="text-[var(--light-blue)]" />
                        <input
                          type="file"
                          name="imageFile"
                          className="hidden"
                          onChange={handleSelectImage}
                        />
                      </label>
                      <LocationOnIcon className="text-[var(--light-blue)]" />
                      <EmojiEmotionsIcon className="text-[var(--light-blue)]" />
                    </div>
                    <div className="entrieBtn">
                      <Button type="submit">PUBLICAR</Button>
                    </div>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

ReplyModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  post: PropTypes.object.isRequired,
};

export default ReplyModal;
