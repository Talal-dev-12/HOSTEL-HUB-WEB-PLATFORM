const { createHostel, getApprovedHostels ,getHostlerHostels , getSingleHostel , purchaseBadges , deleteHostel} = require("../controllers/hostelController")

const protect= require("../middlewares/authMiddleware")
const express = require("express");
const roleCheck = require("../middlewares/roleMiddleware");
const upload = require("../middlewares/upload");
const router = express.Router();

router.post("/list", protect, upload.array("images", 5), roleCheck("hostler") , createHostel);


router.get("/get-approved-hostels" , getApprovedHostels) 

router.get("/get-hostler-hostels"  , protect ,roleCheck("hostler"||"Hostler"), getHostlerHostels)


router.get("/get-single-hostel/:id" , getSingleHostel)

router.patch('/update-badges/:id', protect ,roleCheck("hostler"||"Hostler"), purchaseBadges);


router.delete('/delete/:id', protect, roleCheck("hostler", "admin"), deleteHostel);

module.exports = router;

router.post(
  "/create",
  protect,
  roleCheck("hostler"),
  upload.array("images", 5),
  createHostel
);