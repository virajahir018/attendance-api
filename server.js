require("dotenv").config();
const express = require("express");
const { connect } = require("mongoose");
const connectDb = require("./config/db");
const facultyRouter = require("./routes/facultyRoute");
const coockie = require("cookie-parser");
const studentRouter = require("./routes/studentRoute");
const attendanceRouter = require("./routes/attendanceRoute");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(coockie());
app.use("/faculty", facultyRouter);
app.use("/student", studentRouter);
app.use("/attendance", attendanceRouter);

app.get("/", (req, res) => {
    res.json({
        message: "App is running"
    })
})

connectDb();

app.listen(PORT, () => {
    console.log("App running is port", PORT)
});