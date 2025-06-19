const express = require('express');
const getUserByIdController = express.Router();
const mongoose = require('mongoose');
const User = require('../../Models/user.schema.js');

getUserByIdController.get('/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        // Validate the ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        // Fetch the user by ID
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User fetched successfully',
            user: user
        });

    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
})
module.exports = getUserByIdController;