import mongoose from "mongoose";

const Klient = new mongoose.Schema({
    Nimi: {
        required: true,
        type: String
    },
    kontaktandmed_fk: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Kontaktandmed"
    },
    aadress_fk: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Aadress"
    }
})

export default mongoose.model("Klient", Klient);