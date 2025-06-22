import express from "express";
import { createProduct, deleteProduct, getProduct, updateProduct } from "../controller/products.controller.js";


const router = express.Router();

router.get("/", getProducts);

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:ObjectId", deleteProduct);

export default router;