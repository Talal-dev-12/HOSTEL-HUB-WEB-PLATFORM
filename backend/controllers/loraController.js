// Admin ke liye pending hostels fetch karna
const Hostel = require("../models/Hostel");


exports.getPendingHostels = async (req, res) => {
  try {
    const pendingHostels = await Hostel.find({ status: "pending" })
      .populate("hostlerId", "name email role") // Sirf zaroori fields uthao
      .sort({ createdAt: -1 }); // Newest first
    res.status(200).json({
      success: true,
      count: pendingHostels.length,
      data: pendingHostels,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Hostel Approve ya Reject karne ke liye
// Status update karne ke liye (Approve/Reject)
exports.updateHostelStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'approved' ya 'rejected'

    if (!['approved', 'rejected', 'pending'].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const hostel = await Hostel.findByIdAndUpdate(
      id,
      { status: status },
      { new: true } // Return updated document
    );

    if (!hostel) {
      return res.status(404).json({ success: false, message: "Hostel not found" });
    }

    res.status(200).json({ 
      success: true, 
      message: `Hostel marked as ${status}`, 
      data: hostel 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getAllHostels = async (req, res) => {
  try {
    // Sirf pending status wale hostels uthao
    // .populate('hostlerId') se hostler ka data bhi mil jayega
    const approvedHostels = await Hostel.find()
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