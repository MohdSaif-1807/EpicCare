export const CheckPassword = (req, res, next) => {
    const { password, confirm_password } = req.body;
    if (password === confirm_password) {
        next();
    }
    else {
        console.log("password=" + password);
        console.log("confirm password=" + confirm_password);
        res.status(400).send("Incorrect Password!");
    }
}