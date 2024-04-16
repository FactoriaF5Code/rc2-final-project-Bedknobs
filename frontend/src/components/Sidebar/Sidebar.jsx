import { useState } from "react";
import "./Sidebar.css";
import HomeIcon from "@mui/icons-material/Home";
import MessageIcon from "@mui/icons-material/Message";
import AccountIcon from "@mui/icons-material/AccountCircle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import NavigationItem from "./NavigationItem";
import ProfileMenu from "./ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/Auth/action";

function Sidebar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { auth } = useSelector((store) => store);
  const navigation = [
    {
      title: "Inicio",
      icon: <HomeIcon />,
      path: "/home",
    },
    {
      title: "Mensajes",
      icon: <MessageIcon />,
      path: "/messages",
    },
    {
      title: "Perfil",
      icon: <AccountIcon />,
      path: `/account/${auth.user?.id}`,
    },
  ];
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("Logout");
    handleClose();
    dispatch(logout());
  };

  return (
    <div className="sidebarContainer">
      <img
        src="../../../src/images/logo.svg"
        alt="Logo DoggieDiary"
        className="logoImg"
      />
      <section>
        {navigation.map((item, index) => (
          <NavigationItem key={index} {...item} />
        ))}
      </section>
      <section className="sidebarBtn">
        <div className="searchContainer">
          <input type="text" className="searchInput" placeholder="Buscar..." />
          <span className="inputIcon">
            <SearchIcon />
          </span>
        </div>
        <Button>PUBLICAR</Button>
      </section>
      <section className="profileInfoContainer">
        <Avatar
          alt="Avatar"
          src={auth.user?.image}
        />
        <div className="profileInfoSidebar">
          <span>{auth.user?.fullName}</span>
          <span className="opacity-50">
            @{auth.user?.fullName.split(" ").join("_").toLowerCase()}
          </span>
        </div>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreHorizIcon />
        </Button>
        <ProfileMenu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleLogout}
          message="Cerrar Sesión"
        />
      </section>
    </div>
  );
}

export default Sidebar;
