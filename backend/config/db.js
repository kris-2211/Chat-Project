const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`.green.underline);
    } catch (error) {
        console.log(`Error: ${error.message}`.red.bold);
        process.exit(1);
    }
}

module.exports = connectDB;