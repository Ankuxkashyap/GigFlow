import Gigs from "../model/Gigs.model.js";


const createGigs = async(req, res)=>{
    try{
        const {title, description, budget} = req.body;

        if(!title || !description || !budget){
            return res.status(400).json({message: "All fields are required"});
        }
        const newGigs = new Gigs({
            title,
            description,
            budget,
            ownerId:req.user._id
        });
        await newGigs.save();
        res.status(200).json({message: "Gigs created successfully", newGigs});

    }catch(err){
        res.status(500).json({message: err.message});
        console.log(err);
    }
}

const getAllGis = async(req, res)=>{
    try{
        const gigs = await Gigs.find().populate("ownerId", "username email").select("-password");

        res.status(200).json({message: "Gigs fetched successfully", gigs});
    }catch(err){
        res.status(500).json({message: err.message});
        console.log(err);
    }
}

const getGigsBySearch = async(req, res)=>{
    try{
        const {search} = req.query;
        const gigs = await Gigs.find({
            $or: [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ],
        }).populate("ownerId", "username email").select("-password");
        res.status(200).json({message: "Gigs fetched successfully", gigs});
    }catch(err){
        res.status(500).json({message: err.message});
        console.log(err);
    }
}
const getGigById = async(req,res)=>{
    try{
        const {id} = req.params;
        const gig = await Gigs.findById(id).populate("ownerId", "username email").select("-password");
        res.status(200).json({message: "Gigs fetched successfully", gig});
    }catch(err){
        res.status(500).json({message: err.message});
        console.log(err);
    }
} 

export {createGigs, getAllGis , getGigsBySearch ,getGigById};