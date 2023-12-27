import express from "express";
import { HomePage } from "../controllers/HomePage.js";
const HomeRoute = express.Router();
HomeRoute.get("/home", HomePage);
export default HomeRoute;