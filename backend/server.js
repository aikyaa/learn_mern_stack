import express from "express";
import dotenv from "dotenv";
import {connectDB} from './config/db.js';
import Product from "./models/products.model.js";
import { isObjectIdOrHexString } from "mongoose";

dotenv.config();

const app = express();

app.use(express.json()); //allows us to req data

app.post("/api/products", async(req, res) => {
    //res.send("Server is ready");
    const product = req.body; //given by user

    if (!product.name || !product.price || !product.description || !product.category || !product.seller_id){
        return res.status(400).json({ success: false, message: "Please provide all the details"});
    }

    const newProduct = new Product(product);

    try{
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
    } catch(error){
        console.error("Error in Create Product:", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
});

app.delete("/api/products/:ObjectId", async(req, res) => {
    const {ObjectId} = req.params;
    console.log("ObjectId :", ObjectId);

    try{
        await Product.findbyObjectIdandDelete(ObjectId);
        res.status(200).json({success: true, message: "Product deleted" });
    } catch(error){
        res.status(400).json({success: false, message: "Product not found"});
    }
});

app.listen(5000, '0.0.0.0', () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
});


