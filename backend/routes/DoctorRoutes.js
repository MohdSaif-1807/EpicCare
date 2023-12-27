import express from "express";
import { DoctorLogin, DoctorLogout, DoctorRegistration } from "../controllers/DoctorAuthentication.js";
const doctorRoutes = express();
doctorRoutes.post("/register", DoctorRegistration);
doctorRoutes.post("/login", DoctorLogin);
doctorRoutes.post("/logout", DoctorLogout);
export default doctorRoutes;
