const mongoose = require("mongoose");
const hostelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    rent: { type: Number, required: true },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    description: { type: String, required: true },
    amenities: [{ type: String }],

    // Verification aur Status
    isFeatured: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    hostlerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Ye aapke User model ka naam hona chahiye
      required: true,
    },

    // Ye fields listing ke waqt user manually enter karega
    contactNumber: { type: String, required: true },
    cnic: { type: String, required: true },
    messageByAdmin: {
      type: String,
    },

    // Hostler ka naam hum redundancy ke liye save kar sakte hain
    // ya populate se fetch kar sakte hain
    hostlerName: { type: String, required: true },
  },
  { timestamps: true },
);

const Hostel = mongoose.model("Hostel", hostelSchema);
module.exports = Hostel;
