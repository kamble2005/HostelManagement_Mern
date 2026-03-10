import React, { useState } from "react";
import api from "../lib/axios";
import { ArrowLeftIcon } from "lucide-react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const CreatePage = () => {

  const [hostelName, setHostelName] = useState("");
  const [hostelType, setHostelType] = useState("");
  const [location, setLocation] = useState("");
  const [totalRooms, setTotalRooms] = useState("");
  const [availableRooms, setAvailableRooms] = useState("");
  const [roomType, setRoomType] = useState("");
  const [rentPerMonth, setRentPerMonth] = useState("");
  const [wardenName, setWardenName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [status, setStatus] = useState("Available");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

      await api.post("/hostels", {
        hostelName,
        hostelType,
        location,
        totalRooms: Number(totalRooms),
        availableRooms: Number(availableRooms),
        roomType,
        rentPerMonth: Number(rentPerMonth),
        wardenName,
        contactNumber,
        status
      });

      toast.success("Hostel created successfully!");
      navigate("/");

    } catch (error) {
      console.log("Failed to create hostel", error);
      toast.error("Failed to create hostel.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">

      <div className="container mx-auto px-4 py-8">

        <div className="max-w-2xl mx-auto">

          <Link to="/" className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Dashboard
          </Link>

          <div className="card bg-base-100">

            <div className="card-body">

              <h2 className="card-title text-2xl mb-4">
                Create New Hostel
              </h2>

              <form onSubmit={handleSubmit}>

                {/* HOSTEL NAME */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Hostel Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Hostel Name"
                    className="input input-bordered"
                    value={hostelName}
                    onChange={(e) => setHostelName(e.target.value)}
                    required
                  />
                </div>

                {/* HOSTEL TYPE */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Hostel Type</span>
                  </label>
                  <select
                    className="input input-bordered"
                    value={hostelType}
                    onChange={(e) => setHostelType(e.target.value)}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Boys">Boys</option>
                    <option value="Girls">Girls</option>
                    <option value="Co-ed">Co-ed</option>
                  </select>
                </div>

                {/* LOCATION */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Location</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Location"
                    className="input input-bordered"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>

                {/* TOTAL ROOMS */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Total Rooms</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Total Rooms"
                    className="input input-bordered"
                    value={totalRooms}
                    onChange={(e) => setTotalRooms(e.target.value)}
                    required
                  />
                </div>

                {/* AVAILABLE ROOMS */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Available Rooms</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Available Rooms"
                    className="input input-bordered"
                    value={availableRooms}
                    onChange={(e) => setAvailableRooms(e.target.value)}
                    required
                  />
                </div>

                {/* ROOM TYPE */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Room Type</span>
                  </label>
                  <select
                    className="input input-bordered"
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    required
                  >
                    <option value="">Select Room Type</option>
                    <option value="Single">Single</option>
                    <option value="Double">Double</option>
                    <option value="AC">AC</option>

                  </select>
                </div>

                {/* RENT */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Rent Per Month</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Rent per month"
                    className="input input-bordered"
                    value={rentPerMonth}
                    onChange={(e) => setRentPerMonth(e.target.value)}
                    required
                  />
                </div>

                {/* WARDEN */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Warden Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Warden Name"
                    className="input input-bordered"
                    value={wardenName}
                    onChange={(e) => setWardenName(e.target.value)}
                  />
                </div>

                {/* CONTACT */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Contact Number</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Contact Number"
                    className="input input-bordered"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                  />
                </div>

                {/* STATUS */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Status</span>
                  </label>
                  <select
                    className="input input-bordered"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Available">Available</option>
                    <option value="Full">Full</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>

                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Hostel"}
                  </button>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreatePage;