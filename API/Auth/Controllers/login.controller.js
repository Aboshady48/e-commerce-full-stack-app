const express = require('express');
const login = express();
const User = require('../../Models/user.schema.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

login.post('/login' , async (req,res)=>{
    try {
        // Extract the user data from the request body
        const {email , password} = req.body;
        //check if user email exist
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message : 'User not found'})
        }

        // Compare plain password with hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid Email or Password' });
        }

        // Create a token for the user
        const token = jwt.sign({ userId: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '15d' });

        //save the token in a cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
        });

        // Return the user data and token
        return res.status(200).json({
            message: 'User logged in successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                age: user.age,
                gender: user.gender
            },
            token: token
        });


    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
})
module.exports = login;
