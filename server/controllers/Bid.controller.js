import Bid from "../model/Bid.model.js";
import Gig from "../model/Gigs.model.js";
import mongoose from "mongoose";
 
export const createBid = async (req,res) =>{
    try{
        const {gigId,message} = req.body;
        const freelancerId = req.user._id;
        if(!gigId || !freelancerId || !message){
            return res.status(400).json({message: "All fields are required"});
        }
        const newBid = new Bid({
            gigId,
            freelancerId:req.user._id,
            message
        });

        await newBid.save();
        res.status(200).json({message: "Bid created successfully", newBid});
    }catch(err){
        res.status(500).json({message: err.message});
        console.log(err);
    }
}

export const getBidsByGigs = async (req, res) => {
  try {
    const { gigId } = req.params;

    const bids = await Bid.find({ gigId }).populate("freelancerId", "username email",).select("-password");
    res.status(200).json({ message: "Bids fetched successfully", bids });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
};

// Most Important lerning   
export const hireBid = async (req, res) => {
  try {
    // Step 0: Fetch bid & gig
    const bid = await Bid.findById(req.params.bidId);
    if (!bid) return res.status(404).json({ message: "Bid not found" });

    const gig = await Gig.findById(bid.gigId);
    if (!gig) return res.status(404).json({ message: "Gig not found" });

    if (gig.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    //  LOCK CHECK
    if (gig.status === "assigned") {
      return res.status(400).json({ message: "Gig already assigned" });
    }

    //  Step 1: Lock gig
    gig.status = "assigned";
    await gig.save();

    // Step 2: Hire selected bid
    await Bid.updateOne(
      { _id: bid._id, status: "pending" },
      { status: "hired" }
    );

    // Step 3: Reject others
    await Bid.updateMany(
      { gigId: gig._id, status: "pending" },
      { status: "rejected" }
    );

    res.json({ message: "Freelancer hired successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Hiring failed" });
  }
};