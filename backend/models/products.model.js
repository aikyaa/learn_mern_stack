import mongoose from "mongoose";
import { type } from "os";
import { stringify } from "querystring";

const productSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    price: {
        type: mongoose.Schema.Types.Number,
        required: true
    },
    description: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.String,
        required: true
    }, 
    seller_id:
    {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true,
    },
}, {
        timestamps: true
});

const Product = mongoose.model('Product',productSchema);
export default Product;