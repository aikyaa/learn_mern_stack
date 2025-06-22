import mongoose from "mongoose";
import Product from "../models/products.model.js";

export const createProduct = async(req, res) => {
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
}

export const getProducts = async(req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json({success: true, data : products});
    } catch(error){
        console.log("Error in fetching products:", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
}

export const updateProduct = async(req, res) =>{
    const {id} = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid Product Id"});
    }
    
    try{
        const updatedProduct =await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({success: true, data: updatedProduct });
    } catch(error){
        console.error("Error in updating product:", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    } 
}

export const deleteProduct = async(req, res) => {
    const {ObjectId} = req.params;
    console.log("ObjectId :", ObjectId);

    if(!mongoose.Types.ObjectId.isValid(ObjectId)){
        return res.status(404).json({success: false, message: "Invalid Product Id"});
    }

    try{
        await Product.findByIdAndDelete(ObjectId);
        res.status(200).json({success: true, message: "Product deleted" });
    } catch(error){
        console.error("Error in deleting product:", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
}