import { Link, useNavigate } from "react-router-dom";
import { Trash2, Edit, Eye, MapPin, Building2, User } from "lucide-react";
import api from "../lib/axios.js";
import toast from "react-hot-toast";
import { useState } from "react";

const HostelCard = ({ hostel, setHostels }) => {

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {

      await api.delete(`/hostels/${hostel._id}`);

      setHostels(prev => prev.filter(h => h._id !== hostel._id));

      toast.success("Hostel deleted");

    } catch (error) {

      console.log(error);
      toast.error("Delete failed");

    } finally {

      setShowModal(false);

    }
  };

  return (
    <>
      <Link
        to={`/hostel/${hostel._id}`}
        className="block border border-green-500 rounded-xl p-6 bg-[#0f0a0a] hover:shadow-lg transition"
      >

        {/* Top Row */}
        <div className="flex justify-between items-center mb-3">

          <p className="text-xs text-gray-400">
            {hostel._id}
          </p>

          <span className="bg-green-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
            ₹{hostel.rentPerMonth}
          </span>

        </div>

        {/* Hostel Name */}
        <h2 className="text-lg font-semibold flex items-center gap-2 text-white">
          <Building2 size={18} className="text-green-500"/>
          {hostel.hostelName}
        </h2>

        {/* Warden */}
        <p className="flex items-center gap-2 text-gray-300 mt-2">
          <User size={16} className="text-green-500"/>
          {hostel.wardenName}
        </p>

        {/* Location */}
        <p className="flex items-center gap-2 text-gray-400 mt-2">
          <MapPin size={16} className="text-green-500"/>
          {hostel.location}
        </p>

        {/* Bottom Row */}
        <div className="flex justify-between items-center mt-6">

          <p className="text-gray-400 text-sm">
            Rooms: {hostel.availableRooms}/{hostel.totalRooms}
          </p>

          <div className="flex gap-4">

            {/* Eye → Hostel Profile */}
            <button
              onClick={(e)=>{
                e.preventDefault();
                navigate(`/hostel/view/${hostel._id}`);
              }}
            >
              <Eye size={18} className="text-blue-400"/>
            </button>

            {/* Edit */}
            <button
              onClick={(e)=>{
                e.preventDefault();
                navigate(`/hostel/${hostel._id}`);
              }}
            >
              <Edit size={18} className="text-yellow-400"/>
            </button>

            {/* Delete */}
            <button
              onClick={(e)=>{
                e.preventDefault();
                setShowModal(true);
              }}
            >
              <Trash2 size={18} className="text-red-500"/>
            </button>

          </div>

        </div>

      </Link>

      {/* Delete Modal */}
      {showModal && (
        <dialog className="modal modal-open">

          <div className="modal-box">

            <h3 className="font-bold text-lg text-red-500">
              Delete Hostel
            </h3>

            <p className="py-4">
              Delete <b>{hostel.hostelName}</b> ?
            </p>

            <div className="modal-action">

              <button
                className="btn"
                onClick={()=>setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="btn btn-error"
                onClick={handleDelete}
              >
                Delete
              </button>

            </div>

          </div>

        </dialog>
      )}
    </>
  );
};

export default HostelCard;