const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB  = require("./config/db");

dotenv.config();
connectDB()
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes")); // /api/auth/login

app.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.PORT}`)
);


app.use("/api/hostel", require("./routes/hostelRoutes"));

// admin
app.use("/api/admin", require("./routes/adminRoutes"));
// booking
app.use("/api/booking", require("./routes/bookingRoutes"));


//static uploads
app.use("/uploads", express.static("public/uploads"));
