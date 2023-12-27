import Patient from "../models/Patient.js";
import PatientCounter from "../models/PatientCounter.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import PatientMedicalHistory from "../models/PatientMedicalHistory.js";
export const UserRegistration = async (req, res, next) => {
    try {
        const { firstName, lastName, gender, email, password } = req.body;
        const data = await PatientCounter.findOne({ id: 1 });
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Patient({
            id: data.count,
            firstName,
            lastName,
            gender,
            email,
            password: hashedPassword
        })
        await newUser.save();
        const fullName = firstName + " " + lastName;
        const newPatientRecord = new PatientMedicalHistory({
            lastUpdatedAt: Date.now(),
            patient_details: {
                id: data.count,
                name: fullName,
                gender: gender,
                contact: {
                    email: email
                }
            },
            id: newUser._id
        });
        await newPatientRecord.save();
        await PatientCounter.updateOne({ id: 1 }, { $inc: { count: 1 } })
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            })
        res.status(201).json('Registered successfully!');

    }
    catch (err) {
        console.log(err);
    }
}
export const UserLogin = async (req, res) => {
    const { email, password } = req.body;
    const data = await Patient.findOne({ email: email })
    if (!data) {
        res.status(400).send("No email Found!!");
    }
    else {
        const matching = await bcrypt.compare(password, data.password);
        if (matching) {
            try {
                const newPatientRecord = new PatientMedicalHistory({
                    lastUpdatedAt: Date.now(),
                    patient_details: {
                        id: data.count,
                        name: data.firstName + data.lastName,
                        gender: data.gender,
                        contact: {
                            email: data.email
                        }
                    },
                    id: data._id
                });
                await newPatientRecord.save();
                const token = await jwt.sign({ _id: data._id }, process.env.JWT_SECRET);
                res.status(200).cookie("token", token, {
                    secure: true,
                    maxAge: 90 * 24 * 60 * 60 * 1000,
                }).json({
                    success: true,
                    message: "Login successfull!!",
                    data,
                    jwt_token: token
                });
            }
            catch (error) {
                res.status(400).json({
                    "error": error,
                    "message": "something went wrong!!"
                });
            }
        }
        else {
            res.status(400).send("Incorrect Password!!");
        }
    }
}

export const UserLogout = (req, res) => {
    try {
        res.status(200)
            .clearCookie("token")
            .json({
                "message": "Logout Successfull!!"
            });
    } catch (error) {
        res.status(400)
            .json({
                "message": "something went wrong!!"
            })
    }
}