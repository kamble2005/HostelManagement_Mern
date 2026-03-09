import Hostel from "../models/hostelModel.js";

export const createHostel = async (req, res) => {
  try {
    const hostel = await Hostel.create(req.body);
    res.status(201).json(hostel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllHostels = async (req, res) => {
  try {
    const hostels = await Hostel.find();
    res.json(hostels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateHostel = async (req, res) => {
  try {
    const hostel = await Hostel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(hostel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteHostel = async (req, res) => {
  try {
    await Hostel.findByIdAndDelete(req.params.id);
    res.json({ message: "Hostel deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getHostelById = async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id);

    if (!hostel) {
      return res.status(404).json({ message: "Hostel not found" });
    }

    res.json(hostel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

