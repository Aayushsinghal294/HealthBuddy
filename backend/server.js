import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import dotenv from 'dotenv';
import http from 'http';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js'; 
import adminRouter from './routes/adminRoute.js';
import hospitalRouter from './routes/hospitalRoute.js';
import userRouter from './routes/userRoute.js';
import appointmentRouter from './routes/appointmentRoute.js';
import { initSocket } from './config/socketio.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

connectDB()
connectCloudinary()

app.use(express.json())
app.use(cors())

app.use('/api/admin',adminRouter)
app.use('/api/hospitals', hospitalRouter)
app.use('/api/users', userRouter)
app.use('/api/appointments', appointmentRouter)

app.get('/', (req, res) => {
    res.send('API WORKING kjn')
});

const server = http.createServer(app);
initSocket(server);

server.listen(port, () => console.log(`Server running on port`,port));