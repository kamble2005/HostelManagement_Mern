import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../lib/axios";
import {
  ArrowLeftIcon,
  Building2,
  MapPin,
  BedDouble,
  Phone,
  User,
  IndianRupee
} from "lucide-react";

function HostelProfile() {

  const { id } = useParams();
  const [hostel, setHostel] = useState(null);

  useEffect(() => {
    const fetchHostel = async () => {
      try {
        const res = await api.get(`/hostels/${id}`);
        setHostel(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchHostel();
  }, [id]);

  if (!hostel) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="min-h-screen bg-base-200 p-6">

      <div className="max-w-lg mx-auto">

        {/* Back Button */}
        <Link to="/" className="btn btn-ghost mb-6 gap-2">
          <ArrowLeftIcon className="size-5"/>
          Back
        </Link>

        {/* Card */}
        <div className="card bg-base-100 shadow-lg border">

          <div className="card-body">

            <h2 className="card-title text-xl mb-4">
              Hostel Profile
            </h2>

            <div className="space-y-3 text-sm">

              <p className="flex items-center gap-2">
                <Building2 className="size-4 text-primary"/>
                <strong>Name:</strong> {hostel.hostelName}
              </p>

              <p>
                <strong>Hostel Type:</strong> {hostel.hostelType}
              </p>

              <p className="flex items-center gap-2">
                <MapPin className="size-4 text-primary"/>
                <strong>Location:</strong> {hostel.location}
              </p>

              <p className="flex items-center gap-2">
                <BedDouble className="size-4 text-primary"/>
                <strong>Total Rooms:</strong> {hostel.totalRooms}
              </p>

              <p>
                <strong>Room Type:</strong> {hostel.roomType}
              </p>

              <p className="flex items-center gap-2">
                <IndianRupee className="size-4 text-primary"/>
                <strong>Rent:</strong> ₹{hostel.rentPerMonth}
              </p>

              <p className="flex items-center gap-2">
                <User className="size-4 text-primary"/>
                <strong>Warden:</strong> {hostel.wardenName}
              </p>

              <p className="flex items-center gap-2">
                <Phone className="size-4 text-primary"/>
                <strong>Contact:</strong> {hostel.contactNumber}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default HostelProfile;