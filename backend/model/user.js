const mongoose = require('mongoose');

const userShema =mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, default: 'user' }, 
    }
)

module.exports = mongoose.model('User', userShema);