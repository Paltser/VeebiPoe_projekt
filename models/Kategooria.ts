import mongoose from "mongoose";

const Kategooria = new mongoose.Schema({
    Nimetus: {
        required: true,
        type: String
    }
})

export default mongoose.model("Kategooria", Kategooria);