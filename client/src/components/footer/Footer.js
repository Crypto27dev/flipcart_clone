import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    marginTop:30,
    marginBottom:5,
    padding: 20,
    backgroundColor: "#F2F2F2",
    textAlign: "center",
    color: "#1D1C1C",
  },
});

function Footer() {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Typography>
        Design and Develop by{" "}
        <a
          style={{ textDecoration: "underline", color:"#1D1C1C" }}
          target="_blank"
          href="https://github.com/dhavalnpatel"
        >
          Dhaval Patel
        </a>
      </Typography>
    </Box>
  );
}

export default Footer;
