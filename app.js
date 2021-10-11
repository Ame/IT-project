const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const morgan = require("morgan");
const connectDB = require("./config/db.js");
const cors = require("cors");

// Load config
dotenv.config({ path: "./config/confi.env" });

connectDB();

const app = express();

<<<<<<< HEAD
app.use(cors());
app.options("*", cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "client/build")));
=======
app.use(cors())
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

>>>>>>> nat-admin-frontend

// logger - only use in dev mode
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/contacts", require("./routes/api/contacts"));
app.use("/api/admin", require("./routes/api/admin"));

app.use(express.static(path.join(__dirname, "public")));

<<<<<<< HEAD
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
=======
app.use(express.static(path.join(__dirname, 'public')));


>>>>>>> nat-admin-frontend

module.exports = app;
