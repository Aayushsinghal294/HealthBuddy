import HospitalModel from "../models/hospitalModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getIO } from "../config/socketio.js";

const buildHospitalAuthResponse = (hospital, token) => ({
  success: true,
  message: "Login successful",
  token,
  hospital: {
    _id: hospital._id,
    name: hospital.name,
    email: hospital.email,
    disease: hospital.disease,
    bedsAvailable: hospital.bedsAvailable,
    estimatedWaitMins: hospital.estimatedWaitMins,
    available: hospital.available,
  },
});

const registerHospital = async (req, res) => {
  try {
    const { name, email, password, phone, disease, addressLine1, addressLine2 } = req.body;

    if (!name || !email || !password || !phone || !disease) {
      return res.json({ success: false, message: "Please fill all required fields" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Password should be at least 8 characters" });
    }

    const existingHospital = await HospitalModel.findOne({ email });

    if (existingHospital) {
      return res.json({ success: false, message: "Hospital account already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const hospital = await HospitalModel.create({
      name,
      email,
      password: hashedPassword,
      phone,
      disease,
      image: "https://via.placeholder.com/600x400.png?text=Hospital",
      queue: 0,
      bedsAvailable: 0,
      travel: 15,
      estimatedWaitMins: 15,
      rating: 0,
      about: "New hospital account. Please update profile details.",
      available: false,
      address: {
        line1: addressLine1 || "",
        line2: addressLine2 || "",
      },
      date: Date.now(),
      lastUpdated: Date.now(),
    });

    const token = jwt.sign(
      { hospitalId: hospital._id.toString(), role: "hospital" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    try {
      const io = getIO();
      if (io) {
        const obj = hospital.toObject ? hospital.toObject() : hospital;
        if (obj.password) delete obj.password;
        io.emit("hospital:created", obj);
      }
    } catch (e) {
      console.log("Socket emit error (hospital:created)", e.message);
    }

    return res.json(buildHospitalAuthResponse(hospital, token));
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Something went wrong" });
  }
};

const getHospitals = async (req, res) => {
  try {
    const { disease, available, emergency } = req.query;
    const filter = {};

    if (disease) {
      filter.disease = disease;
    }

    if (available === "true") {
      filter.available = true;
    } else if (available === "false") {
      filter.available = false;
    }

    if (emergency === "true") {
      filter.emergencyAvailable = true;
    }

    const hospitals = await HospitalModel.find(filter)
      .select("-password")
      .sort({ lastUpdated: -1, rating: -1 });
    res.json({ success: true, hospitals });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong" });
  }
};

const getHospitalById = async (req, res) => {
  try {
    const hospital = await HospitalModel.findById(req.params.id).select("-password");

    if (!hospital) {
      return res.json({ success: false, message: "Hospital not found" });
    }

    res.json({ success: true, hospital });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong" });
  }
};

const updateHospitalAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      bedsAvailable,
      queue,
      travel,
      estimatedWaitMins,
      rating,
      available,
      about,
      latitude,
      longitude,
    } = req.body;

    const updatePayload = {
      lastUpdated: Date.now(),
    };

    if (bedsAvailable !== undefined) {
      updatePayload.bedsAvailable = Number(bedsAvailable);
      updatePayload.queue = Number(bedsAvailable);
      if (available === undefined) {
        updatePayload.available = Number(bedsAvailable) > 0;
      }
    } else if (queue !== undefined) {
      updatePayload.queue = Number(queue);
      updatePayload.bedsAvailable = Number(queue);
      if (available === undefined) {
        updatePayload.available = Number(queue) > 0;
      }
    }

    if (travel !== undefined) {
      updatePayload.travel = Number(travel);
    }

    if (estimatedWaitMins !== undefined) {
      updatePayload.estimatedWaitMins = Number(estimatedWaitMins);
    }

    if (rating !== undefined) {
      updatePayload.rating = Number(rating);
    }

    if (available !== undefined) {
      updatePayload.available = available === true || available === "true";
    }

    if (about !== undefined) {
      updatePayload.about = about;
    }

    if (latitude !== undefined) {
      updatePayload.latitude = Number(latitude);
    }

    if (longitude !== undefined) {
      updatePayload.longitude = Number(longitude);
    }

    const hospital = await HospitalModel.findByIdAndUpdate(id, updatePayload, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!hospital) {
      return res.json({ success: false, message: "Hospital not found" });
    }

    res.json({ success: true, message: "Hospital availability updated", hospital });
    try {
      const io = getIO();
      if (io) {
        io.emit("hospital:updated", hospital);
          try {
            // also emit to hospital-specific room if present
            io.to(hospital._id.toString()).emit("hospital:updated", hospital);
          } catch (e) {
            /* ignore room emit errors */
          }
      }
    } catch (e) {
      console.log("Socket emit error (hospital:updated)", e.message);
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong" });
  }
};

const hospitalLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hospital = await HospitalModel.findOne({ email });

    if (!hospital) {
      return res.json({ success: false, message: "Hospital account not found" });
    }

    const isMatch = await bcrypt.compare(password, hospital.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { hospitalId: hospital._id.toString(), role: "hospital" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json(buildHospitalAuthResponse(hospital, token));
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong" });
  }
};

const getMyHospitalProfile = async (req, res) => {
  try {
    const hospital = await HospitalModel.findById(req.hospitalId).select("-password");

    if (!hospital) {
      return res.json({ success: false, message: "Hospital not found" });
    }

    res.json({ success: true, hospital });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong" });
  }
};

const updateMyHospitalStatus = async (req, res) => {
  try {
    req.params.id = req.hospitalId;
    return updateHospitalAvailability(req, res);
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong" });
  }
};

export {
  getHospitals,
  getHospitalById,
  updateHospitalAvailability,
  hospitalLogin,
  registerHospital,
  getMyHospitalProfile,
  updateMyHospitalStatus,
};