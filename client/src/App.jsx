import "./App.css";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage.jsx";
import Auth from "./pages/Auth.jsx";
import RoleSelection from "./pages/RoleSelection.jsx";
import CreateGigPage from "./pages/CreateGigPage.jsx";
import GigDetailsPage from "./pages/GigDetailsPage.jsx";
import GigsPage from './pages/GigsPage.jsx'
import CreateBidPage from "./pages/CreateBidPage.jsx";

function App() {
;
  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />}></Route>
        <Route
          path="/dashboard"
          element={<DashboardPage />} 
        />
        <Route path="/Gigs" element={<GigsPage />}></Route>
        <Route path="/create-gig" element={<CreateGigPage />}></Route>
        <Route path="/role-selection" element={<RoleSelection />}></Route>
        <Route path="/gig/:id" element={<GigDetailsPage />} />
        <Route path="/gig/:id/bid" element={<CreateBidPage />} />
      </Routes>
    </>
  );
}

export default App;
