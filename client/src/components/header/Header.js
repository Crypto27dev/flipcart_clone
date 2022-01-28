import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  makeStyles,
  Box,
  Typography,
} from "@material-ui/core";

import SearchBar from "./SearchBar";
import HeaderMenu from "./HeaderMenu";
import "./Header.css";

const useStyle = makeStyles({
  header: {
    backgroundColor: "#2874f0",
    height: 60,
    paddingLeft: "10%",
    lineHeight: 0,
    display: "flex",
    justifyContent: "center",
    boxShadow: "none",
  },
  header_logo: {
    objectFit: "contain",
    width: 75,
    marginTop: 5,
  },
  header_container: {
    display: "flex",
    alignItems: "center",
  },
  header_subtitle: {
    fontSize: 11,
    fontStyle: "italic",
    fontWeight: 600,
    textDecoration: "none",
  },
  header_icon: {
    objectFit: "contain",
    height: 10,
    marginLeft: 3,
    alignSelf: "start",
  },
});

function Header() {
  const classes = useStyle();
  return (
    <div className="header">
      <AppBar className={classes.header}>
        <Toolbar>
          <Link to="/">
            <Box>
              {/* logo */}
              <img
                className={classes.header_logo}
                src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png"
                alt="Flipkart"
              />
              {/* Explore plus part  */}
              <Box className={classes.header_container}>
                <Typography className={classes.header_subtitle}>
                  <Link to="/plus">
                    Explore <span style={{ color: "#ffe500" }}>Plus</span>
                  </Link>
                </Typography>
                <img
                  className={classes.header_icon}
                  src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png"
                  alt=""
                />
              </Box>
            </Box>
          </Link>
          <SearchBar />
          <HeaderMenu />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
