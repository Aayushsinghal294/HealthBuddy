import mongoose from "mongoose";

const connectDB = async () => {
    const rawUri = (process.env.MONGODB_URI || "").trim().replace(/^['"]|['"]$/g, "");

    if (!rawUri) {
        throw new Error("MONGODB_URI is missing in backend/.env");
    }

    mongoose.connection.on('connected', () => {
        console.log('MongoDB connected');
    });

    await mongoose.connect(rawUri, {
        dbName: process.env.MONGODB_DB || "docrock",
        serverSelectionTimeoutMS: 15000,
    });
}

export default connectDB;

