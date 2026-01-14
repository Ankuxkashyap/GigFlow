import express from "express";
import {createGigs,getAllGis,getGigsBySearch,getGigById} from "../controllers/Gigs.controller.js"
import { authMiddleware,isClient } from "../middlewares/auth.middlewares.js";
const router = express.Router();

router.post("/",authMiddleware,isClient,createGigs);
router.get("/",getAllGis);
router.get('/gig/:id',getGigById);
router.get("/search",getGigsBySearch);

export default router;