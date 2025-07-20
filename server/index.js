const express = require("express");
const mongoose = require("mongoose");
const passport = require('passport');
const cookie=require('cookie-parser')
const path=require('path')
const session = require('express-session');
require('dotenv').config();
require('./config/passport');
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");
const videoRoutes = require("./routes/videoRoutes");
const eventRoutes = require("./routes/eventRoutes");

const app = express();


app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'a-default-secret-for-development-only',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 24 hours
  })
);


app.use(passport.initialize());

app.use(passport.session());

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

app.use("/api/video", videoRoutes);

app.use("/api/events", eventRoutes);

app.use(express.static(path.join(__dirname, "client/dist")));
app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
);


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => console.error("MongoDB connection failed:", err));
