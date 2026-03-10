import React from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HostelProfile from "./pages/HostelProfile";
import HomePage from "./pages/HomePage";
import HostelDetailPage from "./pages/HostelDetailPage";
import CreatePage from "./pages/CreatePage";

const App = () => {
  return (
    <>
      <Toaster position="top-center" />

      <Routes>
        {/* Home Page */}
        <Route path="/" element={<HomePage />} />

        {/* Create Hostel */}
        <Route path="/create" element={<CreatePage />} />

        {/* View / Edit Hostel */}
        <Route path="/hostel/:id" element={<HostelDetailPage />} />
        <Route path="/hostel/view/:id" element={<HostelProfile />} />

      </Routes>
    </>
  );
};

export default App;
