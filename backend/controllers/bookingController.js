const Booking = require("../models/Booking");
const Hostel = require("../models/Hostel");

exports.createBooking = async (req, res) => {
  try {
    const { hostelId, paymentMethod, transactionId, moveInDate } = req.body;
    const userId = req.user._id;

    // 1. Quick Validation
    if (!hostelId || !paymentMethod || !transactionId) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // 2. Parallel Checks (Performance behtar karne ke liye)
    const [hostel, existingTxn] = await Promise.all([
      Hostel.findById(hostelId),
      Booking.findOne({ "payment.transactionId": transactionId })
    ]);

    if (!hostel) return res.status(404).json({ success: false, message: "Hostel not found" });
    if (existingTxn) return res.status(400).json({ success: false, message: "Transaction ID already used" });

    // 3. Calculation & Object Creation
    const tokenAmount = Math.round(hostel.rent * 0.05); // Rounding for clean currency


    const newBooking = await Booking.create({
      tenant: userId,
      hostel: hostelId,
      moveInDate: moveInDate || Date.now(),
      payment: {
        amount: tokenAmount,
        method: paymentMethod,
        transactionId: transactionId,
        status: "pending",
      },
      bookingStatus: "pending",
    });

    // 4. Clean Response
    res.status(201).json({
      success: true,
      message: "Booking submitted",
      bookingId: newBooking._id,
      amount: tokenAmount
    });

  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};



exports.getBookingDetails = async (req, res) => {
  try {
    
    const { id } = req.params;
    const booking = await Booking.findById(id)
      .populate("hostel", "name address images rent") 
      .populate("tenant", "name email");

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching booking" });
  }
};