import express from "express";
import dotenv from "dotenv";
import {connectDB} from './config/db.js';
import path from "path";

import productRoutes from "./routes/products.route.js";
import userRoutes from "./routes/users.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); //allows us to req data

app.use("/api/products", productRoutes);
app.use("/api", userRoutes);

//deployment
if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"/frontend/dist")));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend", "dist", "index.html"));
    });
}

app.listen(PORT, '0.0.0.0', () => {
    connectDB();
    console.log("Server started at http://localhost:"+PORT);
});


