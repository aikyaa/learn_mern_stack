import mongoose from "mongoose";
import { type } from "os";
import { stringify } from "querystring";

const userSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true  
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true
    },
}, {
        timestamps: true
});

const User = mongoose.model('User',userSchema);
export default User;