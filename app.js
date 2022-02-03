const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/internship", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Error connecting to DB");
    console.log(err);
  });

// middile wares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// My routes

const userRoutes = require("./routes/User");

// My routes

app.use("/api", userRoutes);

const port = 8013;

app.get("/", (req, res) => {
  res.send("Working!!");
});

app.listen(port, () => {
  console.log(`Server is running in ${port}`);
});
