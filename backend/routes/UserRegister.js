import express from "express";
import { UserRegistration } from "../controllers/PatientAuthentication.js";
const userRegisterRoute = express.Router();
userRegisterRoute.post("/register", UserRegistration);
export default userRegisterRoute;