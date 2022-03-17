const express = require("express");
const app = express();
const mongoose = require("mongoose");
const env = require("dotenv").config();

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

app.get("/add", (req, res) => {
  res.status(200).send("add url called");
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connection established successfully!");
});

mongoose.connection.on("error", (err) => {
  console.log("Error occured while establishing connection to mongoDB:", err);
});

app.listen(5000, () => {
  console.log("Server started successfully...Listening on port:", 5000);
});
