const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    profilPicture: { type: String },
    theme: { type: String, default: 'light' },
});

module.exports = {
    UserModel: mongoose.model('user', userSchema),
    UserSchema: userSchema,
};
