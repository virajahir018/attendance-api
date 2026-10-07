const mongoose = require("mongoose");

async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB Connected")
    } catch (error) {
        console.log("MongoDb not connect", error.message);
    }
}

module.exports = connectDb;