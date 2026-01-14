import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";

const CreateGigPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        const res = await api.post("/gigs", formData,{withCredentials: true});
        console.log(res);
    }catch(err){
        console.log(err);
    }finally{
        setFormData({
            title: "",
            description: "",
            budget: "",
          });
          toast.success("Gig created successfully");
          navigate("/dashboard");
    }

  };

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center px-4">
      <div className="w-full max-w-xl p-8 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
        <h1 className="text-2xl font-bold mb-6">Create a New Gig</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Gig Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter gig title"
            required
          />

          <Textarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the work"
          />

          <Input
            label="Budget (₹)"
            name="budget"
            type="number"
            value={formData.budget}
            onChange={handleChange}
            placeholder="5000"
          />

          <button
            type="submit"
            className="w-full border cursor-pointer border-black py-3 rounded-md font-medium hover:bg-black hover:text-white transition"
          >
            Create Gig
          </button>
        </form>
      </div>
    </div>
  );
};

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm mb-1 text-gray-700">{label}</label>
    <input
      {...props}
      className="w-full bg-white text-black border border-black rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
    />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div>
    <label className="block text-sm mb-1 text-gray-700">{label}</label>
    <textarea
      {...props}
      rows="4"
      className="w-full bg-white text-black border border-black rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
    />
  </div>
);

export default CreateGigPage;
