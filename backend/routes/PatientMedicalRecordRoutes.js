import express from "express";
import multer from "multer";
import { PatientMedicalRecord, PatientProfileImageUpdate } from "../controllers/PatientMedicalRecord.js";
const PatientMedicalRecordRoutes = express.Router();
const upload = multer();
PatientMedicalRecordRoutes.put("/records/:id", PatientMedicalRecord);
PatientMedicalRecordRoutes.put("/records/prof_img/:id", upload.single("FILE"), PatientProfileImageUpdate);
export default PatientMedicalRecordRoutes;