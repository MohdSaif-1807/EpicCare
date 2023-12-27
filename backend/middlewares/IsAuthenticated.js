import jwt from "jsonwebtoken";
import Patient from "../models/Patient.js";
export const IsAuthenticated = async (req, res, next) => {
    console.log("cookie = " + req.cookies);
    const { token } = req.cookies;
    if (!token) {
        res.status(400).json({
            "error": "No Login Found!! Please Login First!!"
        })
    }
    else {
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await Patient.findById(decode._id);
            next();
        } catch (error) {
            res.status(400).json({
                "error": "something went wrong!!"
            })
        }
    }
}