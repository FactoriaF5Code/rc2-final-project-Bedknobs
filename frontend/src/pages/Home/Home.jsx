import Sidebar from "../../components/Sidebar/Sidebar";
import Grid from "@mui/material/Grid";
import Entries from "../../components/Entries/Entries";
import { Route, Routes } from "react-router-dom";
import Profile from "../Profile/Profile";
import PostDetail from "../../components/PostDetail/PostDetail";

function Home() {
  return (
    <div className="bgHome relative">
      <Grid container item className="justify-between">
        <Sidebar />

        <div className="rightPartHome">
          <Routes>
            <Route path="/" element={<Entries />} />
            <Route path="/home" element={<Entries />} />
            <Route path="/account/:id" element={<Profile />} />
            <Route path="/post/:id" element={<PostDetail />} />
          </Routes>
        </div>
      </Grid>
    </div>
  );
}

export default Home;
