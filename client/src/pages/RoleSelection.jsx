import React from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, UserCircle } from "lucide-react";
import api from '../utils/api.js'
import toast from "react-hot-toast";
 
const RoleSelection = () => {
    const navigate = useNavigate();
    const handleRoleSelection = (role) => {
        role = role.toLowerCase();
      api
        .post("/auth/role-selection", { role })
        .then((res) => {
          if (res.data.success) {
            if(res.data.user.role === "client"){
                navigate("/dashboard");
            }
            else{
                navigate("/Gigs");
            }
            toast.success(res.data.message);
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-2">
            Join as a Client or Freelancer
          </h1>
          <p className="text-gray-600">Choose your role to continue</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => handleRoleSelection("Client")}
            className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-black group"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-black transition-colors">
                <Briefcase className="w-10 h-10 text-black group-hover:text-white transition-colors" />
              </div>
              <h2 className="text-2xl font-bold text-black">I'm a Client</h2>
              <p className="text-gray-600">
                I'm looking to hire talented freelancers for my projects
              </p>
              <ul className="text-sm text-gray-600 space-y-2 text-left w-full">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Post projects and hire talent</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Access to skilled professionals</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Manage projects efficiently</span>
                </li>
              </ul>
            </div>
          </button>

          <button
            onClick={() => handleRoleSelection("Freelancer")}
            className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-black group"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-black transition-colors">
                <UserCircle className="w-10 h-10 text-black group-hover:text-white transition-colors" />
              </div>
              <h2 className="text-2xl font-bold text-black">
                I'm a Freelancer
              </h2>
              <p className="text-gray-600">
                I'm looking for opportunities to work on exciting projects
              </p>
              <ul className="text-sm text-gray-600 space-y-2 text-left w-full">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Find great projects to work on</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Build your portfolio</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Get paid for your skills</span>
                </li>
              </ul>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
