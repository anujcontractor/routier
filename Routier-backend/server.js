import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from 'dotenv';
import restaurantRoutes from './routes/restaurantRoutes.js';
import userRoutes from './routes/userRoutes.js';

config();
const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/api/restaurants', restaurantRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
