const express = require('express');
const register = express();
const User = require('../../Models/user.schema.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


register.post('/register', async (req, res) => {
    try {
        // Extract the user data from the request body
        const {name , email , password , age , gender} = req.body;
        if (!name || !email || !password || !age || !gender) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Validate the email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }
        // Validate the password strength and string
        if (typeof password !== 'string' || password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        ///check that this user exist or not 
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({name,email,password: hashedPassword,age,gender});
        await newUser.save();

        //create a token for the user
        const token = jwt.sign({ userId: newUser._id , name }, process.env.JWT_SECRET, { expiresIn: '15d' });

        //save the token in a cookie
        res.cookie("token", token,{
            httpOnly: true,
            secure: false,
            maxAge: 15 * 24 * 60 * 60 * 1000,// 15 days
        })
        
        // Return the user data and token
        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                age: newUser.age,
                gender: newUser.gender
            },
            token: token
        }); 
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
})


module.exports = register;