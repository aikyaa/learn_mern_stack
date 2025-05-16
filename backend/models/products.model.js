import mongoose from "mongoose";
import { Types } from mongoose.Schema;
import { type } from "os";
import { stringify } from "querystring";

const productSchema = new mongoose.Schema({
    name: {
        type: Types.String,
        required: true
    },
    price: {
        type: Types.Number,
        required: true
    },
    description: {
        type: Types.String,
        required: true
    },
    category: {
        type: Types.String,
        required: true
    }, 
    seller_id:
    {
        type: Types.ObjectId, 
        ref: "User", 
        required: true,
    },
}, {
        timestamps: true
});

const Product = mongoose.model('Product',productSchema);
export default Product;