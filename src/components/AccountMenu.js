import * as React from "react";
import Box from "@mui/material/Box";
import "../style/styles.css";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useHistory } from "react-router";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const open = Boolean(anchorEl);
  const history = useHistory();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("isLoggedIn");
    history.push("/login");
    history.go(0);
  };

  React.useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) setIsLoggedIn(true);
  }, []);

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "space-around",
          textAlign: "center",
          justifyContent: "flex-end",
          color: "white",
          padding: "10px"
        }}
      >
        {isLoggedIn ? (
          <Typography
            sx={{ minWidth: 100, cursor: "pointer" }}
            className="menu_items"
            onClick={() => history.push("/discover/favourites")}
          >
            Favourites
          </Typography>
        ) : (
          ""
        )}
        <Typography
          sx={{ minWidth: 100, cursor: "pointer" }}
          className="menu_items"
          onClick={() => history.push("/discover/Latest")}
        >
          Latest
        </Typography>
        <Typography
          sx={{ minWidth: 100, cursor: "pointer" }}
          className="menu_items"
          onClick={() => history.push("/discover/popular")}
        >
          Popular
        </Typography>
        <Tooltip title="Account settings">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        {isLoggedIn ? (
          <MenuItem onClick={() => handleLogout()}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        ) : (
          <>
            <MenuItem onClick={() => history.push("/logIn")}>
              <Avatar /> SignIn
            </MenuItem>
            <MenuItem onClick={() => history.push("/signup")}>
              <Avatar /> SignUp
            </MenuItem>
          </>
        )}
      </Menu>
    </React.Fragment>
  );
}
