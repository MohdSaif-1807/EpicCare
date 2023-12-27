import Patient from "../models/Patient.js";
export const IsValid = (req, res, next) => {
    const { firstName, lastName, gender, password } = req.body;
    if (!firstName || !lastName || !gender || !password) {
        if (!firstName) {
            res.status(400).json({
                message: "Required Feild FirstName is missing"
            })
        }
        else if (!lastName) {
            res.status(400).json({
                message: "Required Feild LastName is missing"
            })
        }
        else if (!gender) {
            res.status(400).json({
                message: "Required Feild Gender is missing"
            })
        }
        else if (!password) {
            res.status(400).json({
                message: "Required Feild Password is missing"
            })
        }
    }
    else {
        next();
    }
}
export const IsEmailAlreadyExist = async (req, res, next) => {
    const { email } = req.body;
    const data = await Patient.findOne({ email: email });
    console.log(data);
    if (!data) {
        next();
    }
    else {
        res.status(400).json({
            msg: "email already exist!!"
        })
    }
}