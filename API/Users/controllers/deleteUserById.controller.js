const  express = require('express')
const deleteUserByIdController = express.Router();
const User = require('../../Models/user.schema.js');

deleteUserByIdController.delete('/:id',async(req,res)=>{
    try {
        const deletedUser = req.params.id;
        const user = await User.findByIdAndDelete(deletedUser);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            message: 'User deleted successfully',
            user: user
        });
        
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
})

module.exports = deleteUserByIdController

