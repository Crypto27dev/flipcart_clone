import React, { useEffect, useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { Route, Switch } from "react-router";
import { useSelector } from "react-redux";

import Wishlist from "../components/wishlist/Wishlist";
import Sidebar from "../components/account/Sidebar";
import PersonalInfo from "../components/account/PersonalInfo";
import ManageAddresses from "../components/address/ManageAddresses";
import LoaderSpinner from "../components/LoaderSpinner";

const useStyles = makeStyles((theme) => ({
  component: {
    marginTop: 55,
    padding: "30px 6%",
    display: "flex",
  },
  leftComponent: {
    paddingRight: 15,
  },
}));

function MyAccountsPage() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);

  const { isAuthenticate } = useSelector((state) => state.userReducer);
  useEffect(() => {
    if (!isAuthenticate) {
      window.location.replace("/login");
    }
    setIsLoading(false);
  }, [isAuthenticate]);
  return isLoading ? (
    <LoaderSpinner />
  ) : (
    <div>
      <Grid container className={classes.component}>
        <Grid
          item
          lg={3}
          md={3}
          sm={12}
          xs={12}
          className={classes.leftComponent}
        >
          <Sidebar />
        </Grid>
        <Grid style={{ background: "#fff" }} item lg={9} md={9} sm={12} xs={12}>
          <Switch>
            <Route exact path="/account">
              <PersonalInfo />
            </Route>
            <Route exact path="/wishlist">
              <Wishlist />
            </Route>
            <Route exact path="/account/addresses">
              <ManageAddresses />
            </Route>
            <Route>
              <PersonalInfo />
            </Route>
          </Switch>
        </Grid>
      </Grid>
    </div>
  );
}

export default MyAccountsPage;
