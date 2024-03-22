require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user");
const courseRoutes = require("./routes/course");
const cartRoutes = require("./routes/cart");
const playlistRoutes = require("./routes/playlist");
const app = express();

// In question.js
const router = express.Router();

// Define your question routes here
router.get("/", (req, res) => {
  res.send("Routes for questions");
});

// Export the router
module.exports = router;


app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL, process.env.CLIENT_URL], // Replace with the URL of your client application
    credentials: true, // Enable credentials (cookies) support
  })
);
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection sucessful"))
  .catch((err) => console.log(err));

  app.use("/api/user", userRoutes);
  app.use("/api/course", courseRoutes);
  app.use("/api/cart", cartRoutes);
  app.use("/api/playlist", playlistRoutes);

  

app.get("/", (req, res) => {
  res.send("listining from other side");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("front end port", process.env.FRONTEND_URL);
  console.log("admin port ", process.env.ADMIN_URL);
  console.log("client port ", process.env.CLIENT_URL);
  console.log(`Server is running on port ${PORT}`);
});

