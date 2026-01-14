import React from 'react'
import {useAuth} from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import StatCard from '../components/StatCard';
import { Link } from 'react-router-dom';
import GigCard from '../components/GigCard';
import api from '../utils/api';
import Navebar from '../components/Navebar';


const DashboardPage = () => {
    const navigate = useNavigate(); 
    const {isAuthenticated,user,logout} = useAuth();
    const [Gigs, setGigs] = React.useState([]);

    const fetchGigs = async () => {
        try {
            const res = await api.get("/gigs", { withCredentials: true });
            setGigs(res.data.gigs);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchGigs();
    },[]);

  return (
    <div className="min-h-screen bg-white text-black">
        <Navebar/>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-6 mb-12 ">
          <StatCard title="Total Gigs" value={Gigs.length}/>
          <StatCard title="Open Gigs" value='5' />
        </div>

        <h2 className="text-xl font-semibold mb-4">Your Gigs</h2>

        <div className="space-y-4">
          {Gigs.map((gig) => (
            <GigCard key={gig._id} gig={gig}/>
          ))}
        </div>
      </div>
    </div>
  );
};



export default DashboardPage