import React, { useState } from "react";
import api from "../utils/api";

const BidCard = ({ bid, onStatusChange, isHiringLocked }) => {
  const [loading, setLoading] = useState(false);

  const getStatusStyles = () => {
    switch (bid.status) {
      case "hired":
        return "bg-green-100 text-green-700 border-green-700";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-700";
      default:
        return "bg-gray-100 text-gray-700 border-gray-700";
    }
  };

  const handleHire = async () => {
    try {
      setLoading(true);
      const res = await api.patch(`/bids/${bid._id}/hire`, { withCredentials: true });
      console.log(res);
      onStatusChange(res.data.bids);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 rounded-lg shadow-[0_4px_15px_rgba(0,0,0,0.15)] bg-white">
      <div className="flex justify-between items-center mb-3">
        <div>
          <h1 className="font-semibold text-lg">
            @{bid.freelancerId.username}
          </h1>
          <p className="text-sm text-gray-600">
            {bid.freelancerId.email}
          </p>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4">{bid.message}</p>

      <div className="flex justify-between items-center">
        <span
          className={`px-3 py-1 text-sm border rounded-full ${getStatusStyles()}`}
        >
          {bid.status.toUpperCase()}
        </span>

        {bid.status === "pending" && !isHiringLocked && (
          <button
            onClick={handleHire}
            disabled={loading}
            className="px-4 py-2 border border-black rounded-md hover:bg-black hover:text-white transition disabled:opacity-50"
          >
            {loading ? "Hiring..." : "Hire"}
          </button>
        )}
      </div>
    </div>
  );
};

export default BidCard;
