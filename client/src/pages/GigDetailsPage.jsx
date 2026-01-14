import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import BidCard from "../components/BidCard";


const GigDetailsPage = () => {
  const { id } = useParams();
  const [gig, setGig] = React.useState({});
  const [bids, setBids] = React.useState([]);

  const fetchGis = async () => {
    const res = await api.get(`/gigs/gig/${id}`);
    setGig(res.data.gig);
  };
   const fetchBid = async () => {
    const res = await api.get(`/bids/${id}`);
    setBids(res.data.bids);
  };
  useEffect(() => {
    fetchGis();
    fetchBid();
  }, []);
  return (
    <div className="min-h-screen bg-white text-black px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="p-6 rounded-xl shadow-[0_8px_25px_rgba(0,0,0,0.2)] mb-8">
          <h1 className="text-2xl font-bold mb-2">{gig.title}</h1>
          <p className="text-gray-600 mb-4">{gig.description}</p>
          <div className="flex items-center justify-between mt-4">
            <p className="font-semibold text-lg">Budget: ₹{gig.budget}</p>

            <div className="text-right">
              <p className="font-semibold">{gig.ownerId?.username}</p>
              <p className="text-sm text-gray-600">{gig.ownerId?.email}</p>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4">Bids</h2>

        <div className="space-y-4">
          {bids.map((bid) => (
            <BidCard 
            key={bid._id} 
            bid={bid}
            isHiringLocked={bids.some((b) => b.status === "hired")}
            onStatusChange={(updatedBids) => setBids(updatedBids)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GigDetailsPage;
