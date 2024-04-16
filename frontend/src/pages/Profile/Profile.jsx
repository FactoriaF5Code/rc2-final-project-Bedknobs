import { Avatar, Button, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import "./Profile.css";
import { useState } from "react";
import Post from "../../components/Post/Post";
import ProfileModal from "../../components/ProfileModal/ProfileModal";
import { useSelector } from "react-redux";

function Profile() {
  const [tabValue, setTabValue] = useState("1");
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const { auth } = useSelector((store) => store);

  const handleOpenProfileModel = () => setOpenProfileModal(true);
  const handleClose = () => setOpenProfileModal(false);
  const handleFollowUser = () => {
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

  return (
    <main className="bodyContainer">
      <div className="entriesContainer">
        <section className="profileCover">
          <img
            src="https://cdn.pixabay.com/photo/2023/10/23/17/10/landscape-8336497_960_720.jpg"
            alt="Fondo"
          />
          <div className="profileAvatar">
            <Avatar alt="Queniee" src={auth.user?.image} />
          </div>
        </section>
        <section>
          <div className="profileInfo">
            <div className="profileUser">
              <h2>{auth.user?.fullName}</h2>
              <p className="opacity-50">
                @{auth.user?.fullName.split(" ").join("_").toLowerCase()}
              </p>
              <div className="followersAndFollows">
                <p>
                  190 <span className="opacity-50">Seguidores</span>
                </p>
                <p>
                  590<span className="opacity-50"> Seguidos</span>
                </p>
              </div>
              <p>{auth.user?.bio}</p>
            </div>
            <div className="entrieBtn">
              {true ? (
                <Button onClick={handleOpenProfileModel}>EDITAR PERFIL</Button>
              ) : (
                <Button onClick={handleFollowUser}>
                  {true ? "SEGUIR" : "DEJAR DE SEGUIR"}
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
                {Array.isArray(auth.posts) &&
                  auth.posts.map((post, index) => (
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
