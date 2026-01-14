import express from "express"
import {createBid,getBidsByGigs,hireBid} from "../controllers/Bid.controller.js"
import { authMiddleware,isFreelancer,isClient } from "../middlewares/auth.middlewares.js";
const router = express.Router();

router.post("/",authMiddleware,isFreelancer,createBid);
router.get("/:gigId",authMiddleware,getBidsByGigs);
router.patch("/:bidId/hire",authMiddleware,isClient,hireBid);

export default router