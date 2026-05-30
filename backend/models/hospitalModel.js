import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    disease: { type: String, required: true },
    queue: { type: Number, required: true },
    bedsAvailable: { type: Number, required: true },
    travel: { type: Number, required: true },
    estimatedWaitMins: { type: Number, required: true },
    rating: { type: Number, required: true },
    about: { type: String, required: true },
    available: { type: Boolean, default: true },
    address: { type: Object, required: true },
    phone: { type: String, required: true },
    latitude: { type: Number },
    longitude: { type: Number },
    date: { type: Number, required: true },
    lastUpdated: { type: Number, default: Date.now },
    slots_booked: { type: Object, default: {} },
  },
  { minimize: false }
);

const HospitalModel = mongoose.models.hospital || mongoose.model("hospital", hospitalSchema);

export default HospitalModel;