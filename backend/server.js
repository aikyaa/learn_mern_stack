import express from "express";
import dotenv from "dotenv";
import {connectDB} from './config/db.js';

import productRoutes from "./routes/products.route.js";

dotenv.config();

const app = express();

app.use(express.json()); //allows us to req data

app.use("/api/products", productRoutes);

app.listen(5000, '0.0.0.0', () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
});


