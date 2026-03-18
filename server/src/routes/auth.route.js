const express = require("express");
const router = express.Router();
const { signup } = require("../controllers/auth.controller")
const { signupValidation } = require("../middlewares/formValidation")
const { userAuth } = require("../middlewares/auth")

router.post("/signup", signupValidation, signup);
router.get("/user", userAuth, (req, res) => {
    res.json(req.user);
})

module.exports = router;