import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js'; 
import adminRouter from './routes/adminRoute.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
connectDB()
connectCloudinary()

app.use(express.json())
app.use(cors())


app.use('/api/admin',adminRouter)

app.get('/', (req, res) => {
    res.send('API WORKING kjn')
});

app.listen(port, () => console.log(`Server running on port`,port));