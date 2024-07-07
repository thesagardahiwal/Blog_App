const User = require("../models/userModel");

const register = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        if (!username) {
            return res.status(400).json({message: "Username is not provided"})
        }
        if (!email) {
            return res.status(400).json({message: "Email is not provided"})
        }
        if (!password) {
            return res.status(400).json({message: "Password is not provided"})
        }

        const isUserPresent = await User.findOne({username: username});
        const emailCheck = await User.findOne({email: email});
        
        if (isUserPresent) return res.status(400).json({message: "Username is not available!"});
        if (emailCheck) return res.status(400).json({message: "Email is already registered!"});
        
        const user = new User({
            username,
            email,
            password
        });
        user.save();
        res.status(200).json({message: "User is registered successfully!"});
        
    } catch (error) {
        res.status(500).json({message: "Internet Connection Problem!"});
    }

}

module.exports = {
    register
}