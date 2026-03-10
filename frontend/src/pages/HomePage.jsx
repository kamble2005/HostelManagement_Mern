import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import api from "../lib/axios.js";
import { toast } from "react-hot-toast";
import HostelCard from "../components/HostelCard.jsx";
import HostelNotFound from "../components/HostelNotFound.jsx";
import { Search } from "lucide-react";
import { useLocation } from "react-router-dom";

const HomePage = () => {

  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const location = useLocation();

  const fetchHostels = async () => {
    try {

      const res = await api.get("/hostels");
      setHostels(res.data);

    } catch (error) {

      toast.error("Failed to load hostels");

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchHostels();
  }, []);

  useEffect(() => {
    if (location.state?.updated) {
      fetchHostels();
    }
  }, [location.state]);

  /* Hostel Types */

  const hostelTypes = [...new Set(hostels.map(h => h.hostelType))];

  /* Filtering */

  const filteredHostels = hostels
    .filter(h => {

      const searchValue = search.trim().toLowerCase();

      return (
        h.hostelName.toLowerCase().includes(searchValue) ||
        h.location.toLowerCase().includes(searchValue)
      );

    })
    .filter(h => statusFilter === "all" || h.status === statusFilter)
    .filter(h => selectedType === "all" || h.hostelType === selectedType);


  /* TOTAL FEES */

  const totalFees = filteredHostels.reduce((sum, hostel) => {
    return sum + Number(hostel.rentPerMonth || 0);
  }, 0);


  return (

    <div className="min-h-screen bg-base-200">

      <Navbar />

      <div className="max-w-7xl mx-auto p-6">

        {/* PAGE TITLE */}

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-2xl font-bold text-primary">
            Hostel Management
          </h1>

        </div>


        {/* DASHBOARD STATS */}

        <div className="grid md:grid-cols-2 gap-6 mb-8">

          <div className="bg-base-100 shadow rounded-lg p-5">

            <h3 className="text-sm opacity-70">
              Total Hostels
            </h3>

            <p className="text-2xl font-bold">
              {filteredHostels.length}
            </p>

          </div>


          <div className="bg-base-100 shadow rounded-lg p-5">

            <h3 className="text-sm opacity-70">
              Total Fees
            </h3>

            <p className="text-2xl font-bold text-primary">
              ₹{totalFees}
            </p>

          </div>

        </div>


        {/* SEARCH + FILTER */}

        <div className="bg-base-100 p-4 rounded-lg shadow mb-8 flex flex-col md:flex-row gap-4">

          {/* Search */}

          <div className="relative flex-1">

            <Search className="absolute left-3 top-3 size-4 opacity-60" />

            <input
              type="text"
              placeholder="Search hostel name or location"
              className="input input-bordered w-full pl-10"
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
            />

          </div>


          {/* Status Filter */}

          <select
            className="select select-bordered"
            value={statusFilter}
            onChange={(e)=>setStatusFilter(e.target.value)}
          >

            <option value="all">All Status</option>
            <option value="Available">Available</option>
            <option value="Full">Full</option>

          </select>


          {/* Hostel Type Filter */}

          <select
            className="select select-bordered"
            value={selectedType}
            onChange={(e)=>setSelectedType(e.target.value)}
          >

            <option value="all">All Types</option>

            {hostelTypes.map(type => (

              <option key={type} value={type}>
                {type}
              </option>

            ))}

          </select>

        </div>


        {/* LOADING */}

        {loading && (

          <div className="flex justify-center py-10">

            <span className="loading loading-spinner loading-lg text-primary"></span>

          </div>

        )}


        {/* NO DATA */}

        {!loading && filteredHostels.length === 0 && <HostelNotFound />}


        {/* HOSTEL GRID */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredHostels.map(hostel => (

            <HostelCard
              key={hostel._id}
              hostel={hostel}
              setHostels={setHostels}
            />

          ))}

        </div>

      </div>

    </div>

  );

};

export default HomePage;