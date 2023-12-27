import Doctor from "../models/Doctor.js";
import DoctorCounter from "../models/DoctorCounter.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const DoctorRegistration = async (req, res) => {
    const { doctor_name, specialization, email, password, confirm_password, hospital_clinic_info } = req.body;
    const doctor_counter = await DoctorCounter.findOne({ id: 1 });
    const hashedPassword = await bcrypt.hash(password, 10);
    const doctor_id = doctor_counter.count;
    const doctor_register = new Doctor({
        doctor_id: doctor_id,
        doctor_name: doctor_name,
        specialization: specialization,
        email: email,
        password: hashedPassword,
        hospital_clinic_info: hospital_clinic_info
    })
    await doctor_register.save();
    await DoctorCounter.updateOne({ id: 1 }, { $inc: { count: 1 } });
    res.status(201).json({
        message: "Doctor Registration Successfull!",
        doctor_register
    })
}

export const DoctorLogin = async (req, res) => {
    const { email, password } = req.body;
    const temp_doctor_login = await Doctor.findOne({ email: email });
    if (temp_doctor_login) {
        if (bcrypt.compare(password, temp_doctor_login.password)) {
            const token = await jwt.sign({ _id: temp_doctor_login._id }, process.env.JWT_SECRET);
            res.status(200).cookie("token", token, {
                secure: true,
                maxAge: 90 * 24 * 60 * 60 * 1000,
            }).json({
                success: true,
                message: "Login successfull!!",
                temp_doctor_login,
                jwt_token: token
            });
        }
        else {
            res.status(400).json({
                error: "Incorrect Password!!"
            })
        }
    }
    else {
        res.status(400).json({
            error: "Email not found!!"
        })
    }
}

export const DoctorLogout = (req, res) => {
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
