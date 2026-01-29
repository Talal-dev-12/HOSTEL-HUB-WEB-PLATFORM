const {  createBooking, getBookingDetails } = require("../controllers/bookingController");
const protect= require("../middlewares/authMiddleware")
const express = require("express");
const router = express.Router();
router.post("/create", protect, createBooking);
router.get("/:id",protect,getBookingDetails);
module.exports = router;
