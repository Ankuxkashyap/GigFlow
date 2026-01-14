import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/User.route.js';
import cookieParser from 'cookie-parser';
import gigRoutes from './routes/gig.route.js';
import bidRoutes from './routes/Bid.route.js';
import cors from 'cors'

dotenv.config();

const app = express();

const PORT = 5000;

connectDB();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH']
}))

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/gigs', gigRoutes);
app.use('/api/bids', bidRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});