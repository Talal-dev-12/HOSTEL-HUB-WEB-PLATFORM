const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    hostel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hostel",
      required: true,
    },
    payment: {
      amount: { type: Number, required: true },
      method: {
        type: String,
        enum: ["card", "wallet", "bank"],
        required: true,
      },
      transactionId: {
        type: String,
        required: true,
        unique: true,
        sparse: true,
      }, // sparse: true zaroori hai
      status: {
        type: String,
        enum: ["pending", "verified", "failed"],
        default: "pending",
      },
      status: {
        type: String,
        enum: ["pending", "verified", "failed"],
        default: "pending", // Admin will verify transaction ID
      },
    },
    bookingStatus: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    moveInDate: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Booking", bookingSchema);
