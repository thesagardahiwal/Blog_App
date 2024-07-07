const express = require('express');
const router = express.Router();
const { register } = require("../controllers/authController")
const passport = require('passport');
const { isLoggedIn } = require('../middlewares/authChecker');

router
    .post('/login', (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(400).send('Invalid email or password');
            }
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }

                if (req.body.rememberMe) {
                    req.session.cookie.maxAge = 12 * 24 * 60 * 60 * 1000;
                } else {
                    req.session.cookie.expires = false; 
                }


                return res.status(200).send('Logged in');
            });
        })(req, res, next);
    })
    .post("/register", register)
    .get('/logout', isLoggedIn, (req, res) => {
        try {
            req.logout();
            res.status(200).json({message: "Logged out"});
        } catch (error) {
            res.status(500).json({message: 'Connection Problem!'});
            
        }
    })
    .get("/isloggedin", isLoggedIn, (req, res) => {
        try {
            res.status(200).json(req.user);
        } catch (error) {
            res.status(500).json({message: "Internet Problem!"});
        }
    })

module.exports = router;