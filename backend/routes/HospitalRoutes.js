import express from "express";
import { HospitalLogin, HospitalLogout, HospitalRegistration } from "../controllers/HospitalAuthentication.js";
const HospitalRoutes = express();
HospitalRoutes.post("/register", HospitalRegistration);
HospitalRoutes.post("/login", HospitalLogin);
HospitalRoutes.post("/logout", HospitalLogout);
export default HospitalRoutes;
