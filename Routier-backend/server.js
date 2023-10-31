import express from "express";
import cors from "cors";
import restaurantRoutes from './routes/restaurantRoutes.js';
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/api/restaurants', restaurantRoutes);

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
