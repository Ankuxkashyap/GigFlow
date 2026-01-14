import React, { useEffect, useState } from "react";
import GigCard from "../components/GigCard";
import api from "../utils/api";

const GigsPage = () => {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    const fetchGigs = async () => {
        try {
            const res = await api.get("/gigs", { withCredentials: true });
            setGigs(res.data.gigs);
        } catch (err) {
            console.log(err);
        }
    };
    fetchGigs();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <h1 className="text-2xl font-bold mb-6">Available Gigs</h1>

      <div className="grid gap-4">
        {gigs.map((gig) => (
          <GigCard key={gig._id} gig={gig} />
        ))}
      </div>
    </div>
  );
};

export default GigsPage;
