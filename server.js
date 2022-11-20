const express = require("express");
var cookieParser = require("cookie-parser");

require("dotenv").config({ path: "./config/.env" });

require("./config/DBConnection");
const useRouter = require("./routes/router");

const app = express();

//app uses
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", useRouter);

const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  if (req.header("x-forwarded-proto") !== "https") {
    res.redirect(`https://${req.header("host")}${req.url}`);
  } else {
    next();
  }
});

if (process.env.NODE_ENV == "production") {
  const path = require("path");

  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Server is running at ${port}`));
