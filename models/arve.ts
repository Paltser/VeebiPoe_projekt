import mongoose from "mongoose";

const arve = new mongoose.Schema({
    kuupaev: {
        required: true,
        type: Date
    },
    kogusumma: {
        required: true,
        type: Number
    },
    arve_fk: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Arve"
    },
    arverida_fk: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Arverida"
    },
    klient_fk: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Klient"
    }
})

export default mongoose.model("Arve", arve);