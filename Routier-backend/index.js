import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import restaurantRoutes from './routes/restaurantRoutes.js';
import todoRouter from './routes/todoRoutes.js';
import todoController from './controller/todoController.js';


config();
const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

app.use('/api/users', userRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/todo', todoRouter);


app.get('/', (req, res) => {
    res.send(`<h1>Hello World!<h1>${PORT}`);
});

app.post('/api/todo',(req,res)=>{
  console.log("Hi");
  console.log(req.body);
  
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
