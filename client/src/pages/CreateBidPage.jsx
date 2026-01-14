import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";

const CreateBidPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [gig, setGig] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGig = async () => {
      const res = await api.get(`/gigs/gig/${id}`);
      setGig(res.data.gig);
    };
    fetchGig();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        setLoading(true);
        const res =  await api.post(`/bids`, { message, gigId: id }); 
        console.log(res);
    }catch(err){
        console.log(err);
    }finally{
        toast.success("Bid created successfully");
        setLoading(false);
        navigate("/my-bids");
    }

  };

  return (
    <div className="min-h-screen bg-white text-black px-4 py-10">
      <div className="max-w-3xl mx-auto space-y-10">
        <div className="p-6 rounded-xl shadow-[0_6px_20px_rgba(0,0,0,0.15)]">
          <h1 className="text-2xl font-bold mb-2">{gig.title}</h1>

          <p className="text-gray-700 leading-relaxed mb-4">
            {gig.description}
          </p>

          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold">
              Budget: ₹{gig.budget}
            </p>

            <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-black">
              {gig.status?.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="p-6 rounded-xl shadow-[0_6px_20px_rgba(0,0,0,0.15)]">
          <h2 className="text-xl font-bold mb-4">
            Apply for this Gig
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">
                Your Proposal
              </label>

              <textarea
                rows="6"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Explain your approach, experience, and why the client should hire you"
                className="w-full rounded-lg px-4 py-3 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 cursor-pointer rounded-lg font-medium shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:bg-black hover:text-white transition"
            >
              {loading ? "Submitting..." : "Submit Proposal"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default CreateBidPage;
