import mongoose from 'mongoose';
const BidSchema = new mongoose.Schema({
    gigId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Gigs",
        required: true,
    },
    freelancerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "hired", "rejected"],
        default: "pending",
    },
}, { timestamps: true });

export default mongoose.model("Bid", BidSchema);
