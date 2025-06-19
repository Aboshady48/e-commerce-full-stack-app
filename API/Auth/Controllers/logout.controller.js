const express = require('express');
const logout = express();

logout.post('/logout', async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
        });
        return res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        console.error('Error logging out user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
})

module.exports = logout;