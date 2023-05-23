import mongoose from "mongoose";

const kontaktandmed = new mongoose.Schema({
    tel_number: {
        required: true,
        type: Number
    },
    email: {
        required: true,
        type: String
    }

})

export default mongoose.model("Kontaktandmed", kontaktandmed);