const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
        unique: true
    },

    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty",
        required: true,
    },

    date: {
        type: Date,
        default: Date.now
    },

    status: {
        type: String,
        enum: ["Present", "Absent"],
        required: true
    }
})

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance