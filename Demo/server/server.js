const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

// 👇 Passport config
require("./config/passport");
const passport = require("passport");

// 👇 ADD THIS LINE
const contactRoutes = require("./routes/contactRoutes");

const app = express();
connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.use(express.json());

// 👇 Passport init (keep this order)
app.use(passport.initialize());

// =========================
// ROUTES
// =========================
app.use("/api", require("./routes/authRoutes"));
app.use("/auth", require("./routes/googleAuthRoutes"));

// 👇 ADD THIS ROUTE
app.use("/api/contact", contactRoutes);

// =========================
// SERVER
// =========================
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
