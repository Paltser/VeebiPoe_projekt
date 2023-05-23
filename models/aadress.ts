import mongoose from "mongoose";

const Aadress = new mongoose.Schema({
    tanav: {
        required: true,
        type: String
    },
    maja: {
        required: true,
        type: Number
    },
    linn: {
        required: true,
        type: String
    },
    postiindeks: {
        required: true,
        type: Number
    }
})

export default mongoose.model("Aadress", Aadress);