import mongoose from "mongoose";

const arverida = new mongoose.Schema({
    kogus: {
        required: true,
        type: Number
    },
    toode_fk: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Toode"
    }
})

export default mongoose.model("Arverida", arverida);