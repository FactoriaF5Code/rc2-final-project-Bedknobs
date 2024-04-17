import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Post.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState } from "react";
import ReplyModal from "../ReplyModal/ReplyModal";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRePost, deletePost, likePost } from "../../store/Post/Action";
import PropTypes from "prop-types";

function Post({ post }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openReplyModal, setOpenReplyModal] = useState(false);
  const handleOpenReplyModel = () => setOpenReplyModal(true);
  const handleCloseReplyModal = () => setOpenReplyModal(false);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeletePost = () => {
    console.log("delete post");
    handleClose();
    dispatch(deletePost(post.id));
  };
  const handleCreateRepost = () => {
    dispatch(createRePost(post?.id));
    console.log("repost done");
  };
  const handleLikePost = () => {
    dispatch(likePost(post?.id));
    console.log("handle like work");
  };
  return (
    <React.Fragment>
      <div className="postUserContainer">
        <Avatar
          onClick={() => navigate(`/account/${post?.user.id}`)}
          alt="username"
          src={post?.user?.image}
        />
        <div>
          <div className="postUser">
            <section className="postUsername">
              <span>{post?.user?.fullName}</span>
              <span className="opacity-50">
                @{post?.user?.fullName.split(" ").join("_").toLowerCase()} . 2m
              </span>
            </section>
            <section>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MoreHorizIcon />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleDeletePost}>Borrar</MenuItem>
              </Menu>
            </section>
          </div>

          <div className="postInfoContainer">
            <section
              onClick={() => navigate(`/post/${post?.id}`)}
              className="postInfo"
            >
              <p>{post?.content}</p>
              {post?.image && <img src={post?.image} alt="" />}
            </section>
            <section className="postOptions">
              <div
                className={`${post?.reply ? "text-teal-500" : "text-gray-600"}`}
              >
                <ChatBubbleOutlineIcon onClick={handleOpenReplyModel} />
                <p>{post?.totalReplies}</p>
              </div>
              <div
                className={`${
                  post?.repost ? "text-teal-500" : "text-gray-600"
                }`}
              >
                <RepeatIcon onClick={handleCreateRepost} />
                <p>{post?.totalReposts}</p>
              </div>
              <div
                className={`${post?.liked ? "text-teal-500" : "text-gray-600"}`}
              >
                {post?.liked ? (
                  <FavoriteIcon onClick={handleLikePost} />
                ) : (
                  <FavoriteBorderIcon onClick={handleLikePost} />
                )}
                <p>{post?.totalLikes}</p>
              </div>
            </section>
          </div>
        </div>
      </div>
      <section>
        <ReplyModal
          post={post}
          handleClose={handleCloseReplyModal}
          open={openReplyModal}
        />
      </section>
    </React.Fragment>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      fullName: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired,
    content: PropTypes.string.isRequired,
    image: PropTypes.string,
    reply: PropTypes.bool.isRequired,
    totalReplies: PropTypes.number.isRequired,
    repost: PropTypes.bool.isRequired,
    totalReposts: PropTypes.number.isRequired,
    liked: PropTypes.bool.isRequired,
    totalLikes: PropTypes.number.isRequired,
  }).isRequired,
};

export default Post;
