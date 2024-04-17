import "./Entries.css";
import { Avatar, Button, Divider } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import ImageIcon from "@mui/icons-material/Image";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useEffect, useState } from "react";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { createPost, getAllPosts } from "../../store/Post/Action";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";

function Entries() {
  // eslint-disable-next-line no-unused-vars
  const [uploadingImage, setUploadingImage] = useState();
  const [selectedImage, setSelectedImage] = useState("");
  const dispatch = useDispatch();
  const { post, auth } = useSelector((store) => store);
  console.log("post ", post);

  const validationSchema = Yup.object().shape({
    content: Yup.string().required("Es necesario un mensaje"),
  });

  const handleSubmit = (values, actions) => {
    dispatch(createPost(values));
    actions.resetForm();
    console.log("values", values);
    setSelectedImage("");
  };

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch, post.like, post.repost]);

  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
      isPost: true,
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  const handleSelectImage = async (event) => {
    setUploadingImage(true);
    const imgUrl = await uploadToCloudinary(event.target.files[0]);
    formik.setFieldValue("image", imgUrl);
    setSelectedImage(imgUrl);
    setUploadingImage(false);
  };
  return (
    <main className="bodyContainer">
      <div className="entriesContainer">
        <section className="newEntrieContainer">
          <Avatar alt="username" src={auth.user?.image} />
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
                  <span className="text-red-400">{formik.errors.content}</span>
                )}
              </div>
              <div className="entrieOptiosContainer">
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
            <div>{selectedImage && <img src={selectedImage} alt="" />}</div>
          </div>
        </section>
        <section>
          {Array.isArray(post.posts) &&
            post.posts?.map((post, index) => (
              <div key={index}>
                <Post post={post} />
                <div className="divider">
                  <Divider />
                </div>
              </div>
            ))}
        </section>
      </div>
    </main>
  );
}

export default Entries;
