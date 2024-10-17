import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import route from './routes/userRoutes.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api", route)


//Qe39WDmMBPMamgwE
//connect db 
import connectDB from './config/db.js';
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
