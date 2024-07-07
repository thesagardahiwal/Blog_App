

const isLoggedIn = async (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.status(401).json({message: "User is not logged in!"});
        }
    } catch (err) {
        res.status(500).json({message: "Connection problem!"})
    }
}

module.exports = {
    isLoggedIn
}