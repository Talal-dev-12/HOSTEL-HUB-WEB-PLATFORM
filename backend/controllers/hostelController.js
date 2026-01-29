const rateLimit = require("express-rate-limit");
const uploadOnCloudinary = require("../utils/cloudinary");

const Hostel = require("../models/Hostel");



exports.createHostel = async (req, res) => {
  try {
    const amenities = Array.isArray(req.body.amenities)
      ? req.body.amenities
      : [req.body.amenities];

    const imageUrls = [];

    for (const file of req.files) {
      const url = await uploadOnCloudinary(file.path);
      imageUrls.push(url);
    }

    const hostel = await Hostel.create({
      name: req.body.name,
      location: req.body.location,
      rent: Number(req.body.rent),
      description: req.body.description,
      contactNumber: req.body.contactNumber,
      cnic: req.body.cnic,
      amenities,
      images: imageUrls, // Cloudinary URLs
      hostlerId: req.user._id,
      hostlerName: req.user.name,
      status: "pending",
    });

    res.status(201).json({ success: true, hostel });

  } catch (error) {
    console.log("Cloudinary Error:", error);
    res.status(500).json({ message: error.message });
  }
};



exports.getApprovedHostels = async (req, res) => {
  try {
    // Sirf pending status wale hostels uthao
    // .populate('hostlerId') se hostler ka data bhi mil jayega
    const approvedHostels = await Hostel.find({ status: "approved" })
      .select(
        "name location rent images amenities isFeatured isVerified description hostlerName status contactNumber",
      )
      .populate("hostlerId", "name")

      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: approvedHostels.length,
      data: approvedHostels,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.getHostlerHostels = async (req, res) => {
  try {
    const hostlerHostels = await Hostel.find({ hostlerId: req.user._id })
      .select(
        "name location rent images amenities isFeatured isVerified description status contactNumber",
      )
      .populate("hostlerId", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: hostlerHostels.length,
      data: hostlerHostels,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSingleHostel = async (req, res) => {
  try {
    const id = req.params.id;
    const hostel = await Hostel.findById(id);

    if (!hostel) {
      return res.status(404).json({ error: "Hostel not found" });
    }

    return res.status(200).json({
      success: true,
      hostel,
    });
  } catch (error) {
    return res.status(500).json({
      detailed: error.message,
      error: "Internal Server Error",
    });
  }
};

exports.purchaseBadges = async (req, res) => {
  try {
    const { id } = req.params;
    const { isFeatured, isVerified } = req.body;

    // Database mein flags update karein
    const updatedHostel = await Hostel.findByIdAndUpdate(
      id,
      {
        isFeatured: isFeatured,
        isVerified: isVerified,
      },
      { new: true }, // updated document wapas mangne ke liye
    );

    if (!updatedHostel) {
      return res
        .status(404)
        .json({ success: false, message: "Hostel not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Badges updated successfully",
      data: updatedHostel,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteHostel = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Hostel dhoondein
    const hostel = await Hostel.findById(id);

    if (!hostel) {
      return res
        .status(404)
        .json({ success: false, message: "Hostel not found" });
    }

    // 2. Authorization Check
    // Aapke schema mein field 'hostlerId' hai
    const ownerId = hostel.hostlerId ? hostel.hostlerId.toString() : null;
    const userId = req.user.id; // User ID jo 'protect' middleware se aa rahi hai

    // Admin delete kar sake ya sirf wo hostler jisne ye hostel banaya hai
    if (req.user.role !== "admin" && ownerId !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You can only delete your own hostels",
      });
    }

    // 3. Delete from Database
    await Hostel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Hostel deleted successfully",
    });
  } catch (error) {
    console.error("Delete Error Trace:", error); // Ye Node.js terminal mein dikhega
    return res.status(500).json({
      success: false,
      message: "Server error while deleting hostel",
      error: error.message,
    });
  }
};
