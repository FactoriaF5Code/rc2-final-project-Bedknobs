import { Avatar, Button, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import "./Profile.css";
import { useEffect, useState } from "react";
import Post from "../../components/Post/Post";
import ProfileModal from "../../components/ProfileModal/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { findUserById, followUserAction } from "../../store/Auth/action";
import { useParams } from "react-router-dom";
import { getUsersPost } from "../../store/Post/Action";

function Profile() {
  const [tabValue, setTabValue] = useState("1");
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const { auth, post } = useSelector((store) => store);
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleOpenProfileModel = () => setOpenProfileModal(true);

  const handleClose = () => setOpenProfileModal(false);

  const handleFollowUser = () => {
    dispatch(followUserAction(id));
    console.log("Follow user");
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 4) {
      console.log("likes post");
    } else if (newValue == 1) {
      console.log("users posts");
    }
  };

  useEffect(() => {
    dispatch(findUserById(id));
    dispatch(getUsersPost(id));
  }, [dispatch, id]);

  return (
    <main className="bodyContainer">
      <div className="entriesContainer">
        <section className="profileCover">
          {auth.findUser?.backgroundImage ? 
          <img
            src={auth.findUser?.backgroundImage}
            alt="Fondo"
          /> :
          <img
            src="../../../src/images/bgPhoto.jpg"
            alt="Fondo"
          />
        }
          <div className="profileAvatar">
            <Avatar alt="Queniee" src={auth.findUser?.image} />
          </div>
        </section>
        <section>
          <div className="profileInfo">
            <div className="profileUser">
              <h2>{auth.findUser?.fullName}</h2>
              <p className="opacity-50">
                @{auth.findUser?.fullName.split(" ").join("_").toLowerCase()}
              </p>
              <div className="followersAndFollows">
                <p>
                  {auth.findUser?.followers?.length}{" "}
                  <span className="opacity-50">Seguidores</span>
                </p>
                <p>
                  {auth.findUser?.following?.length}
                  <span className="opacity-50"> Seguidos</span>
                </p>
              </div>
              <p className="profileBio">{auth.findUser?.bio}</p>
              <div className="calendarInfo">
                <CalendarMonthIcon className="text-teal-500" />
                <p></p>
              </div>
            </div>
            <div className="entrieBtn">
              {auth.findUser?.req_user  ? (
                <Button onClick={handleOpenProfileModel}>EDITAR PERFIL</Button>
              ) : (
                <Button onClick={handleFollowUser}>
                  {auth.findUser?.followed ? "DEJAR DE SEGUIR" : "SEGUIR"}
                </Button>
              )}
            </div>
          </div>
          <div></div>
        </section>
        <section className="userTable">
          <Box>
            <TabContext value={tabValue}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleTabChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Posts" value="1" />
                  <Tab label="Comentarios" value="2" />
                  <Tab label="Media" value="3" />
                  <Tab label="Likes" value="4" />
                </TabList>
              </Box>
              <TabPanel value="1">
                {auth.findUser?.req_user && post.posts?.map((post, index) => (
                  <div key={index}>
                    <Post post={post} />
                    <div className="divider">
                      <Divider />
                    </div>
                  </div>
                ))}
              </TabPanel>
              <TabPanel value="2">Comentarios</TabPanel>
              <TabPanel value="3">Media</TabPanel>
              <TabPanel value="4">Likes</TabPanel>
            </TabContext>
          </Box>
        </section>
        <section>
          <ProfileModal
            handleClose={handleClose}
            handleOpen={openProfileModal}
          />
        </section>
      </div>
    </main>
  );
}

export default Profile;
