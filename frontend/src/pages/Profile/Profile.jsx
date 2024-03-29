import { Avatar, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import "./Profile.css";
import { useState } from "react";
import  Post from "../../components/Post/Post"

function Profile() {
  const [tabValue, setTabValue] = useState("1");
  const handleOpenProfileModel = () => {
    console.log("Open profile model");
  };

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
            <Avatar
              alt="Queniee"
              src="https://cdn.pixabay.com/photo/2023/09/22/17/59/dog-8269584_640.jpg"
            />
          </div>
        </section>
        <section>
          <div className="profileInfo">
            <div className="profileUser">
              <h2>Rosie Queen</h2>
              <p className="opacity-50">@Quennie</p>
              <div className="followersAndFollows">
                <p>
                  190 <span className="opacity-50">Seguidores</span>
                </p>
                <p>
                  590<span className="opacity-50"> Seguidos</span>
                </p>
              </div>
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
              {[1, 1, 1, 1, 1].map((item) => (
            <Post />
          ))}
              </TabPanel>
              <TabPanel value="2">Comentarios</TabPanel>
              <TabPanel value="3">Media</TabPanel>
              <TabPanel value="4">Likes</TabPanel>
            </TabContext>
          </Box>
        </section>
      </div>
    </main>
  );
}

export default Profile;
