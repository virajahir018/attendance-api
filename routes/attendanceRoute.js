const express = require("express");
const auth = require("../middleware/auth");
const Attendance = require("../models/Attendance");

const attendanceRouter = express.Router();

attendanceRouter.post("/add", auth, async (req, res) => {
    const { studentId, status } = req.body;

    const attendance = await Attendance.create({
        student: studentId,
        faculty: req.user.id,
        status: status
    });
    res.json({
        message: "Student attendance marked",
        attendance
    })
})
attendanceRouter.get("/all", auth, async (req, res) => {

    const student = await Attendance.find();

    res.json({
        message: "Student List",
        student
    })
})

attendanceRouter.get("/day", auth, async (req, res) => {
    try {
        const { date } = req.query;

        const start = new Date(date);
        start.setHours(0, 0, 0, 0);

        const end = new Date(date);
        end.setHours(23, 59, 59, 999);

        const student = await Attendance.find({
            date: {
                $gte: start,
                $lte: end
            }
        }).populate("student", "name");

        if (student.length === 0) {
            return res.json({
                message: "No students found for this date"
            })
        }

        res.json({
            message: "Student List",
            student
        });

    } catch (error) {
        res.json({
            message: error.message
        });
    }
});

module.exports = attendanceRouter;