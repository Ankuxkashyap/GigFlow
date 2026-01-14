import { useNavigate } from "react-router-dom";
const StatCard = ({ title, value,id }) => {
    const navigate = useNavigate();

    return(
  <div 
  onClick={()=>{navigate(`/gigs/${id}`)}}
  className="p-6 rounded-xl shadow-[0_6px_20px_rgba(0,0,0,0.15)] cursor-pointer">
    <p className="text-gray-600 mb-1">{title}</p>
    <p className="text-3xl font-bold">{value}</p>
  </div>
    )
};

export default StatCard;