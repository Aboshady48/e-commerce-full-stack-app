const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const authRouter = require('./Auth/Routes/index.auth.route.js');
const userRouter = require('./Users/routes/index.user.route.js');
const connectDB = require('./config/dbConnection.js');
require('dotenv').config();


// Connect to the database
connectDB();


// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS configuration
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

// Routes
app.use('/auth', authRouter);
app.use('/users', userRouter);

//sever
mongoose.connection.once('connected', () => {
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});