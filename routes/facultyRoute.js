const express = require("express");
const bcrypt = require("bcrypt");
const Faculty = require("../models/Faculty");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

const facultyRouter = express.Router();

facultyRouter.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({
                message: "Require all field"
            })
        }

        const hash = await bcrypt.hash(password, 5);

        is = await Faculty.findOne({ email })

        if (is) {
            return res.json({
                message: "User already register"

            })
        }

        const faculty = await Faculty.create({
            name,
            email,
            password: hash
        })

        res.json({
            faculty
        })
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})

facultyRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({
                message: "Require all field"
            })
        }

        isUser = await Faculty.findOne({ email });

        if (!isUser) {
            return res.json({
                message: "User not register"
            })
        }

        const compare = await bcrypt.compare(password, isUser.password);

        if (!compare) {
            return res.json({
                message: "Password not match"
            })
        }

        const token = jwt.sign(
            {
                email,
                id: isUser._id
            },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        )

        const accessCookie = {
            httpOnly: false,
            secure: false,
            sameSite: "lax",
            maxAge: 15 * 60 * 1000
        };

        res.cookie("access", token, accessCookie)

        res.json({
            token
        })
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})

facultyRouter.post("/profile", auth, async (req, res) => {
    try {
        res.json({
            message: "Faculty login success fully"
        })
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})

module.exports = facultyRouter;