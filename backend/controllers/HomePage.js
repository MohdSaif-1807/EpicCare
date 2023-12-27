export const HomePage = (req, res) => {
    console.log(req.user);
    res.json({ "message": "Login Successfull!! This is home page " });
}