import express from "express";
import {
  getHospitals,
  getHospitalById,
  updateHospitalAvailability,
  hospitalLogin,
  registerHospital,
  getMyHospitalProfile,
  updateMyHospitalStatus,
} from "../controllers/hospitalController.js";
import authAdmin from "../middlewares/authAdmin.js";
import authHospital from "../middlewares/authHospital.js";

const hospitalRouter = express.Router();

hospitalRouter.post("/login", hospitalLogin);
hospitalRouter.post("/register", registerHospital);
hospitalRouter.get("/me", authHospital, getMyHospitalProfile);
hospitalRouter.patch("/me/status", authHospital, updateMyHospitalStatus);
hospitalRouter.get("/", getHospitals);
hospitalRouter.get("/:id", getHospitalById);
hospitalRouter.patch("/:id/availability", authAdmin, updateHospitalAvailability);

export default hospitalRouter;