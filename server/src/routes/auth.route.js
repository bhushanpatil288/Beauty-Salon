const express = require("express");
const router = express.Router();
const { signup, logout, login, adminSignup, adminLogin } = require("../controllers/auth.controller")
const { signupValidation, loginValidation, adminSignupValidation, adminLoginValidation } = require("../middlewares/formValidation")
const { userAuth } = require("../middlewares/auth")

router.post("/signup", signupValidation, signup);
router.post("/signup/admin", adminSignupValidation, adminSignup);
router.post("/login", loginValidation, login);
router.post("/login/admin", adminLoginValidation, adminLogin);
router.post("/logout", logout);
router.get("/user", userAuth, (req, res) => {
    res.json(req.user);
})

module.exports = router;