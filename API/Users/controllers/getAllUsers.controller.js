const express = require('express');
const getAllUsersController = express();
const User = require('../../Models/user.schema.js');

getAllUsersController.get('/', async (req, res) => {
    try {
        const getAllusers = await User.find();

        if (getAllusers.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.status(200).json({
            message: 'All users fetched successfully',
            users: getAllusers
        })
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
})
module.exports = getAllUsersController;