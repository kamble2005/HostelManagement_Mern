import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../lib/axios.js";
import toast from "react-hot-toast";
import { LoaderIcon, Trash2Icon, ArrowLeftIcon } from "lucide-react";

const HostelDetailPage = () => {

  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {

    const fetchHostel = async () => {
      try {
        const res = await api.get(`/hostels/${id}`);
        setHostel(res.data);
      } catch (error) {
        console.error("Error fetching hostel", error);
        toast.error("Failed to fetch hostel");
      } finally {
        setLoading(false);
      }
    };

    fetchHostel();

  }, [id]);

  const handleDelete = async () => {

    if (!window.confirm("Are you sure you want to delete this hostel?")) return;

    try {
      await api.delete(`/hostels/${id}`);
      toast.success("Hostel deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting hostel", error);
      toast.error("Failed to delete hostel");
    }
  };

  const handleSave = async () => {

    if (
      !hostel.hostelName.trim() ||
      !hostel.hostelType.trim() ||
      !hostel.location.trim()
    ) {
      toast.error("Please fill required details");
      return;
    }

    setSaving(true);

    try {

      await api.put(`/hostels/${id}`, {
        hostelName: hostel.hostelName,
        hostelType: hostel.hostelType,
        location: hostel.location,
        totalRooms: Number(hostel.totalRooms),
        availableRooms: Number(hostel.availableRooms),
        roomType: hostel.roomType,
        rentPerMonth: Number(hostel.rentPerMonth),
        wardenName: hostel.wardenName,
        contactNumber: hostel.contactNumber,
        status: hostel.status
      });

      toast.success("Hostel updated successfully");
      navigate("/");

    } catch (error) {
      console.error("Error updating hostel", error);
      toast.error("Failed to update hostel");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">

      <div className="container mx-auto px-4 py-8">

        <div className="max-w-2xl mx-auto">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-6">

            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Dashboard
            </Link>

            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
              <Trash2Icon className="h-5 w-5" />
              Delete Hostel
            </button>

          </div>

          {/* FORM CARD */}
          <div className="card bg-base-100 shadow-lg">

            <div className="card-body">

              {/* HOSTEL NAME */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Hostel Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={hostel.hostelName}
                  onChange={(e) =>
                    setHostel({ ...hostel, hostelName: e.target.value })
                  }
                />
              </div>

              {/* HOSTEL TYPE */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Hostel Type</span>
                </label>
                <select
                  className="input input-bordered"
                  value={hostel.hostelType}
                  onChange={(e) =>
                    setHostel({ ...hostel, hostelType: e.target.value })
                  }
                >
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
                  className="input input-bordered"
                  value={hostel.location}
                  onChange={(e) =>
                    setHostel({ ...hostel, location: e.target.value })
                  }
                />
              </div>

              {/* TOTAL ROOMS */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Total Rooms</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered"
                  value={hostel.totalRooms}
                  onChange={(e) =>
                    setHostel({ ...hostel, totalRooms: e.target.value })
                  }
                />
              </div>

              {/* AVAILABLE ROOMS */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Available Rooms</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered"
                  value={hostel.availableRooms}
                  onChange={(e) =>
                    setHostel({ ...hostel, availableRooms: e.target.value })
                  }
                />
              </div>

              {/* ROOM TYPE */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Room Type</span>
                </label>
                <select
                  className="input input-bordered"
                  value={hostel.roomType}
                  onChange={(e) =>
                    setHostel({ ...hostel, roomType: e.target.value })
                  }
                >
                  <option value="Single">Single</option>
                  <option value="Double">Double</option>
                  <option value="Triple">Triple</option>
                </select>
              </div>

              {/* RENT */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Rent Per Month</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered"
                  value={hostel.rentPerMonth}
                  onChange={(e) =>
                    setHostel({ ...hostel, rentPerMonth: e.target.value })
                  }
                />
              </div>

              {/* WARDEN */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Warden Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={hostel.wardenName || ""}
                  onChange={(e) =>
                    setHostel({ ...hostel, wardenName: e.target.value })
                  }
                />
              </div>

              {/* CONTACT */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Contact Number</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={hostel.contactNumber || ""}
                  onChange={(e) =>
                    setHostel({ ...hostel, contactNumber: e.target.value })
                  }
                />
              </div>

              {/* STATUS */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Status</span>
                </label>
                <select
                  className="input input-bordered"
                  value={hostel.status}
                  onChange={(e) =>
                    setHostel({ ...hostel, status: e.target.value })
                  }
                >
                  <option value="Available">Available</option>
                  <option value="Full">Full</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>

              {/* ACTION */}
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default HostelDetailPage;