import express from "express";
import {
  createHostel,
  getAllHostels,
  updateHostel,
  deleteHostel,
  getHostelById,
} from "../controllers/hostelController.js";

const router = express.Router();

router.get("/", getAllHostels);
router.post("/", createHostel);
router.put("/:id", updateHostel);
router.delete("/:id", deleteHostel);
router.get("/:id", getHostelById);

export default router;
