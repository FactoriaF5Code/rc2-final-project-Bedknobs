import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Divider } from "@mui/material";
import Post from "../Post/Post";
import "./PostDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { findPostsById } from "../../store/Post/Action";

function PostDetail() {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { post } = useSelector((store) => store);

  useEffect(() => {
    if (id) {
      dispatch(findPostsById(id));
    }
  }, []);

  return (
    <React.Fragment>
      <main className="bodyContainer">
        <div className="entriesContainer">
          <section className="backFunction">
            <KeyboardBackspaceIcon
              className="cursor-pointer"
              onClick={handleBack}
            />
            <h2>Entrada</h2>
          </section>
          <section>
            <Post post={post.post} />
            <div className="mb-7">
              <Divider />
            </div>
          </section>
          <section>
            {post?.post?.replyPosts.map((comment, index) => (
              <div key={comment.id || index}>
                <Post post={comment} />
                <div className="divider">
                  <Divider />
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>
    </React.Fragment>
  );
}

export default PostDetail;
