const express = require("express");
const app = new express();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "backend/config/config.env" });
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const task = require("./routes/task");
const user = require("./routes/user");
const bucket = require("./routes/bucket");

app.use("/api/v1/", task);
app.use("/api/v1/", user);
app.use("/api/v1/", bucket);

module.exports = app;
