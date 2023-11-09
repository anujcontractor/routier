import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from 'dotenv';
import restaurantRoutes from './routes/restaurantRoutes.js';
import placeinfoRoutes from './routes/placeinfoRoutes.js';
import userRoutes from './routes/userRoutes.js';
import connectDB from './config/db.js';
import reviewRoutes from './routes/reviewRoutes.js';
import favouriteRoutes from './routes/favouriteRoutes.js'

config();
const PORT = process.env.PORT || 8000;
connectDB();


const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/api/restaurants', restaurantRoutes);
app.use('/api/users', userRoutes);
app.use('/api/placeinfo', placeinfoRoutes);
app.use('/reviews', reviewRoutes);
app.use('/api/favourites', favouriteRoutes);

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
