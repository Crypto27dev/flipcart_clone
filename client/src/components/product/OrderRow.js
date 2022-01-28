import React from "react";
import { Box, makeStyles, Typography, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeShortText } from "../../utils/makeShortText";

const useStyle = makeStyles((theme) => ({
  itemRow: {
    padding: "25px 35px",
    margin: "16px 0",
    background: "#fff",
    boxShadow: "0 -2px 10px 0 rgb(0 0 0 / 10%)",
    borderTop: "1px solid #f0f0f0",
    justifyContent: "space-between",
  },
  image: {
    width: "60%",
    maxHeight:150,
    objectFit: "contain",
  },
  price: {
    fontSize: 20,
    fontWeight: 600,
  },
  text: {
    fontSize: 14,
    color: "#212121",
    marginBottom: 5,
    marginTop: 5,
  },
  centerItems: {
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
  },
  itemTitle:{
    color: "#212121",
    fontSize: 14,
    "&:hover": {
      cursor: "pointer",
      color: "#2874f0",
    },
  }
}));

function OrderRow({ order }) {
  const classes = useStyle();
  const address = order.addressDetails;
  const orderDate = new Date(order.orderDate);

  return (
    <>
      {order?.items?.map((item, index) => (
        <Box className={classes.itemRow}>
          <Grid container>
            <Grid item lg={2} md={2}>
              {/* Image */}
              <Box>
                <img
                  src={order.productDetails[index].url}
                  className={classes.image}
                  alt={order.productDetails[index].title.shortTitle}
                />
              </Box>
            </Grid>
            <Grid item lg={3} md={3}>
              {/* Title */}
              <Link to={`/product/${order.productDetails[index]._id}`}>
                <Typography className={classes.itemTitle} >
                  {makeShortText(order.productDetails[index].title.longTitle)}
                </Typography>
              </Link>
            </Grid>
            <Grid item lg={2} md={2} className={classes.centerItems}>
              {/* Price */}
              <span className={classes.price}>₹{item.price}</span>
            </Grid>
            <Grid item lg={2} md={2} style={{ paddingLeft: "2%" }}>
              {/* Price */}
              <Typography className={classes.text}>
                {orderDate.toLocaleDateString()}
              </Typography>
              <Typography className={classes.text}>
                {order.paymentMode === "online" ? "Online" : "Cash on Delivery"}
              </Typography>
            </Grid>
            <Grid item lg={3} md={3}>
              {/* Address */}
              <Box>
                <Typography className={classes.text}>
                  {address.name}

                  <span style={{ marginLeft: 10 }}>{address.number}</span>
                </Typography>
                <Typography className={classes.text}>
                  {address.houseAddress}, {address.locality}, {address.city},{" "}
                  {address.state} -
                  <span> {address.pincode}</span>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      ))}
    </>
  );
}

export default OrderRow;
