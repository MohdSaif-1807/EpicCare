import Hospital from "../models/Hospital.js";
import HospitalCounter from "../models/HospitalCounter.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const HospitalRegistration = async (req, res) => {
    const { hospital_name, specialization, email, password, confirm_password, certifications, address, doctor_list } = req.body;
    const hospital_counter = await HospitalCounter.updateOne({ id: 1 }, { $inc: { count: 1 } });
    const hospital_id = hospital_counter.count;
    const hashedPassword = await bcrypt.hash(password, 10);
    const hospital_register = new Hospital({
        hospital_id: hospital_id,
        hospital_name: hospital_name,
        specialization: specialization,
        email: email,
        password: hashedPassword,
        certifications: certifications,
        address: address,
        doctor_list: doctor_list
    })
    await hospital_register.save();
    res.status(200).json({
        message: "Registration Completed!!",
        hospital_register
    })
}

export const HospitalLogin = async (req, res) => {
    const { email, password } = req.body;
    const hospital_data = await Hospital.findOne({ email: email });
    if (hospital_data) {
        if (bcrypt.compare(hospital_data.password, password)) {
            const jwt_token = await jwt.sign({ _id: hospital_data._id }, process.env.JWT_SECRET);
            res.status(200).cookie("token", jwt_token, {
                secure: true,
                maxAge: 90 * 24 * 60 * 60 * 1000,
            }).json({
                message: "Login Successfull"
            })
        }
        else {
            res.status(400).json({
                error: "Invalid Password!!"
            })
        }
    }
    else {
        res.status(400).json({
            error: "Email not found!!"
        })
    }
}

export const HospitalLogout = async (req, res) => {
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
