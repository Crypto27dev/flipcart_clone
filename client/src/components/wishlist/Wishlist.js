import { Box, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/styles";

import { getWishlistItems } from "../../actions/wishlistActions";
import { emptyWishlist } from "../../constants/data";

import WishlistItem from "./WishlistItem";

const useStyles = makeStyles({
  container: {},
  header: {
    padding: "20px 40px",
    fontSize: 18,
    fontWeight: 500,
    borderBottom: "1px solid #e0e0e0",
  },
  emptyContainer: {
    marginTop: "15vh",
    textAlign: "center",
  },
  heading:{
      fontWeight:600,
      fontSize:18,
      marginTop:35,
      marginBottom:10,
  },
  para:{
      fontSize:14,
  }
});

function Wishlist() {
  const { wishlistItems } = useSelector((state) => state.wishlistReducer);
  const { isAuthenticate } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (isAuthenticate) {
      dispatch(getWishlistItems());
    }
  }, []);

  return (
    <Box className={classes.container}>
      {wishlistItems.length > 0 ? (
        <>
          <Typography className={classes.header}>
            My Wishlist ({wishlistItems.length})
          </Typography>
          {wishlistItems.map((item) => (
            <WishlistItem item={item} />
          ))}
        </>
      ) : (
        <Box className={classes.emptyContainer}>
          <img src={emptyWishlist} alt="Empty" />
          <Typography className={classes.heading}>Empty Wishlist</Typography>
          <Typography className={classes.para}>
            You have no items in your wishlist. Start adding!
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default Wishlist;
