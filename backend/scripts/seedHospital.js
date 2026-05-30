import "dotenv/config";
import bcrypt from "bcrypt";
import connectDB from "../config/mongodb.js";
import HospitalModel from "../models/hospitalModel.js";

const run = async () => {
  try {
    await connectDB();

    const email = "testhospital@docrock.com";
    const existing = await HospitalModel.findOne({ email });

    if (existing) {
      console.log("Seed hospital already exists");
      process.exit(0);
    }

    const password = await bcrypt.hash("Test@12345", 10);

    await HospitalModel.create({
      name: "DocRock Test Hospital",
      email,
      password,
      image: "https://via.placeholder.com/600x400.png?text=DocRock+Hospital",
      disease: "Heart Problem",
      queue: 6,
      bedsAvailable: 6,
      travel: 12,
      estimatedWaitMins: 12,
      rating: 4.4,
      about: "Seed record for workflow testing",
      available: true,
      address: { line1: "Jabalpur", line2: "Madhya Pradesh" },
      phone: "9999999999",
      latitude: 23.1815,
      longitude: 79.9864,
      date: Date.now(),
      lastUpdated: Date.now(),
    });

    console.log("Seed hospital created");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

run();
