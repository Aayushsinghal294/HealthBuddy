import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    disease: { type: String, required: true },
    queue: { type: Number, required: true },
    travel: { type: Number, required: true },
    rating: { type: Number, required: true },
    about: { type: String, required: true },
    available: { type: boolean, required: true },
    address: { type: Object, required: true },
    date: { type: Number, required: true },
    slots_booked: { type: Object, default:{}},
},{minimize:false})

const doctorModel = mongoose.models.doctor || mongoose.model("doctor", doctorSchema);

export default doctorModel;