const express = require("express");
const Student = require("../models/Student");

const studentRouter = express.Router();

studentRouter.post("/", async (req, res) => {
    try {
        const students = await Student.create(req.body);

        res.status(201).json({
            message: "Students created successfully",
            students
        });

    } catch (error) {
        res.status(500).json({
            message: "Students create failed",
            error: error.message
        });
    }
});

module.exports = studentRouter;