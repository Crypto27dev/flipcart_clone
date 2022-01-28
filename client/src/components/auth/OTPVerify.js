import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import OtpInput from "react-otp-input";

import { makeStyles } from "@material-ui/styles";
import { Button, CircularProgress, Link } from "@material-ui/core";

import toastMessage from "../../utils/toastMessage";

import ToastMessageContainer from "../ToastMessageContainer";

const useStyles = makeStyles((theme) => ({
  buttonProgress: {
    color: "white",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

function OTPVerify({
  handleActions,
  phoneNumber,
  setIsLoginComponent,
  source = "signup",
}) {
  const [otp, setOTP] = useState("");
  const [loading, setLoading] = useState(false);
  const { OTPResult } = useSelector((state) => state.userReducer);
  const classes = useStyles();

  useEffect(() => {
    toastMessage(`Verification code send to ${phoneNumber}`, "success");
  }, []);

  const verifyOTP = async () => {
    setLoading(true);
    try {
      await OTPResult.confirm(otp);
      setLoading(false);
      switch (source) {
        case "signup":
          handleActions({
            openStep1: false,
            openStep2: true,
            openOTPVerify: false,
          });
          break;
        case "login":
          loginWithMobileNumber();
          break;
        default:
          // no need to specify default case because already we set signup as a default argument
          break;
      }
    } catch (error) {
      setLoading(false);
      if (error.toString().includes("auth/invalid-verification-code")) {
        toastMessage("Invalid code. Please enter valid code", "info");
      } else {
        toastMessage("Something went wrong", "error");
      }
    }
  };

  const loginWithMobileNumber = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/accounts/login-with-phone", {
        phone: phoneNumber,
      });
      setLoading(false);
      window.location.replace("/");
    } catch (error) {
      setLoading(false);
      toastMessage("Something went wrong. Please login later.", "error");
    }
  };

  const handleOnClick = () => {
    switch (source) {
      case "signup":
        handleActions({
          openStep1: true,
          openStep2: false,
          openOTPVerify: false,
        });
        break;
      case "login":
        setIsLoginComponent(true);
        break;
      default:
        // no need to specify default case because already we set signup as a default argument
        break;
    }
  };
  const handleChange = (otp) => setOTP(otp);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: 18, margin: "20px 0" }}>
          {`Please enter the OTP send to ${phoneNumber} `}
          <Link
            style={{ cursor: "pointer", textDecoration: "none" }}
            onClick={handleOnClick}
          >
            Change
          </Link>
        </p>
        <OtpInput
          value={otp}
          onChange={handleChange}
          numInputs={6}
          separator={<span></span>}
          inputStyle={{
            height: 50,
            width: 50,
            margin: "0px 5px",
            fontSize: 18,
          }}
          errorStyle={{ borderColor: "red" }}
        />
        <Button
          variant="contained"
          color="primary"
          disabled={loading}
          style={{
            background: "#2874f0",
            width: "50%",
            height: 40,
            margin: "20px 0",
          }}
          onClick={verifyOTP}
        >
          {loading ? (
            <CircularProgress size={24} className={classes.buttonProgress} />
          ) : (
            "Verify"
          )}
        </Button>
      </div>
      <ToastMessageContainer />
    </>
  );
}

export default OTPVerify;
