import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box, Divider, makeStyles, Typography } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles({
  container: {
    marginTop: 30,
  },
  menuLink: {
    display: "flex",
    cursor: "pointer",
  },
  menuItem: {
    padding: "12px 25px",
  },
  menuIcon: {
    marginRight: 10,
    color: "#2874f0",
  },
  divider: {
    opacity: 0.6,
    width: "90%",
    margin: "0 5%",
  },
});

function ProfileMenu({ logout }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user } = useSelector((state) => state.userReducer);
  const classes = useStyles();
  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    switch (e.target.id) {
      case "account":
        history.push("/account");
        break;
      case "wishlist":
        history.push("/wishlist");
        break;
      case "orders":
        history.push("/orders");
        break;
      default:
        break;
    }
    setAnchorEl(null);
  };

  return (
    <div
      id="menu"
      onMouseEnter={handleClick}
      onMouseLeave={handleClose}
      onWheel={handleClose}
    >
      <Box className={classes.menuLink}>
        <Typography style={{ color: "#fff", textTransform: "capitalize" }}>
          {user.fname}
        </Typography>
        <ExpandMoreIcon />
      </Box>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClick={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        className={classes.container}
      >
        <MenuItem
          id="account"
          className={classes.menuItem}
          onClick={handleClose}
        >
          <AccountCircleIcon className={classes.menuIcon} />
          My Profile
        </MenuItem>
        <Divider className={classes.divider} />
        <MenuItem
          id="orders"
          className={classes.menuItem}
          onClick={handleClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 18"
            className={classes.menuIcon}
            style={{marginRight:15}}
          >
            <g
              fill="none"
              fill-rule="evenodd"
              transform="translate(-8.694 -11)"
            >
              <ellipse cx="20.557" cy="20" rx="20.557" ry="20" />
              <path
                fill="#2874F1"
                d="M9 11v17.108c0 .493.41.892.918.892h4.93v-5.257h-3.033l4.912-4.77 4.972 4.83h-3.035V29h12.417c.507 0 .918-.4.918-.892V11H9z"
              />
            </g>
          </svg>
          Orders
        </MenuItem>
        <Divider className={classes.divider} />
        <MenuItem
          id="wishlist"
          className={classes.menuItem}
          onClick={handleClose}
        >
          <FavoriteIcon className={classes.menuIcon} />
          Wishlist
        </MenuItem>
        <Divider className={classes.divider} />
        <MenuItem
          id="logout"
          className={classes.menuItem}
          onClick={(e) => {
            handleClose(e);
            logout();
          }}
        >
          <PowerSettingsNewIcon className={classes.menuIcon} />
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}

export default ProfileMenu;
