import express from 'express';
import {authMiddleware} from "../middlewares/auth.middlewares.js";
import {registerUser,loginUser,roleSelection,profile,logoutUser} from "../controllers/User.controller.js";

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/role-selection', authMiddleware, roleSelection);
router.get('/me', authMiddleware,profile);
router.get('/logout', authMiddleware,logoutUser);

export default router;