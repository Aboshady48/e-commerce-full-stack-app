const express = require("express");
const editUserByIdController = express.Router();
const mongoose = require("mongoose");
const User = require("../../Models/user.schema.js");

editUserByIdController.put("/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;

        // Validate the ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        // Update the user by ID
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
            new: true,
        });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User updated successfully",
            user: updatedUser
        })
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "Internal server error" });
        
    }
})

module.exports = editUserByIdController;