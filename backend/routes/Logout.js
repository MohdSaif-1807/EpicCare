import express from "express";
import { UserLogout } from "../controllers/PatientAuthentication.js";
const LogoutRoute = express.Router();
LogoutRoute.get("/logout", UserLogout);
export default LogoutRoute;