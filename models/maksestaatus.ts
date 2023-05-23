import mongoose from "mongoose";

const maksestaatus = new mongoose.Schema({
    makseseisund: {
        required: true,
        type: Boolean
    },
    maksmise_tahtaeg: {
        required: true,
        type: Date
    },
    makstud_summa: {
        required: true,
        type: Number
    },
    maksmis_kuupaev: {
        required: true,
        type: Date
    }

})

export default mongoose.model("Maksestaatus", maksestaatus);