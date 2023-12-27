import { UserLogin } from "../controllers/PatientAuthentication.js";
import express from "express";
const UserLoginRoute = express.Router();
UserLoginRoute.post("/login", UserLogin);
export default UserLoginRoute;