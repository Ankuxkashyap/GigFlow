import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const GigCard = ({ gig }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <div
      key={gig.id}
      onClick={() =>
        navigate(
          user?.role === "client" ? `/gig/${gig._id}` : `/gig/${gig._id}/bid`
        )
      }
      className="p-5 rounded-lg shadow-[0_4px_15px_rgba(0,0,0,0.15)] flex justify-between cursor-pointer items-center"
    >
      <div>
        <h3 className="text-lg font-semibold">{gig.title}</h3>
        <p className="text-sm text-gray-600">Budget: ₹{gig.budget}</p>
      </div>
      <span
        className={`px-3 py-1 text-sm rounded-full border ${
          gig.status === "open"
            ? "border-green-500 text-white bg-green-500"
            : "border-red-500 text-white bg-red-500"
        }`}
      >
        {gig.status}
      </span>
    </div>
  );
};

export default GigCard;
