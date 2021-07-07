const mongoose = require('mongoose')
require('dotenv').config();

const connectMongo = async () => {
    return await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
}


mongoose.connection.on('connected', () => {
    console.log('Database connection successful');
});

mongoose.connection.on('error', err => {
    console.log(`Mongoose connection error: ${err.message}`);
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Connection to DB closed');
        process.exit(1);
    });
});

module.exports = {
    connectMongo
}