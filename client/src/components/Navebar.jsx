import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navebar = () => {
  const { user } = useAuth();
  return (
    <nav className="shadow-[0_2px_10px_rgba(0,0,0,0.15)]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to={`${user?.role === "client" ? "/dashboard" : "/Gigs"}`}
          className="items-center text-2xl font-bold"
        >
          GigFlow
        </Link>
        <div className="flex justify-end gap-6">
          <Link
            to={`${user?.role==="client" ? "/create-gig" :" /create-gig"}`}
            className="px-4 py-2 border border-black rounded-md hover:bg-black hover:text-white transition"
          >
            Create Gig
          </Link>
          <button
            onClick={() => {
              logout();
            }}
            className="px-4 py-2 text-sm text-gray-600 border cursor-pointer border-black rounded-md hover:bg-red-400 hover:text-white hover:border-red transition-colors"
          >
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navebar;
