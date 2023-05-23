import mongoose from "mongoose";

const Toode = new mongoose.Schema({
    Nimetus: {
        required: true,
        type: String
    },
    Hind: {
        required: true,
        type: Number
    },
    pildi_url: {
        required: true,
        type: String
    },
    aktiivne: {
        required: true,
        type: Boolean
    },
    laokogus: {
        required: true,
        type: Number
    },
    vananemis_aeg: {
        required: true,
        type: Number
    },
    kategooria_fk: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Kategooria"
    }

})

export default mongoose.model("Toode", Toode);