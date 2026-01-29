const { getPendingHostels ,getApprovedHostels, updateHostelStatus, getAllHostels } = require("../controllers/loraController");
const  roleCheck = require("../middlewares/roleMiddleware")
const express = require("express");
const protect= require("../middlewares/authMiddleware")

const router = express.Router();

router.get("/get-pending-hostels",protect , roleCheck("admin" , "hostler") , getPendingHostels)



// Admin status update karne ke liye
router.patch(
  "/update-status/:id", 
  protect, 
  roleCheck("admin"), 
  updateHostelStatus
);
module.exports = router;


router.get("/all-hostels",protect, 
  roleCheck("admin"), getAllHostels)