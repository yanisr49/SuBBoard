const mongoose = require('mongoose');
const { SubscriptionSchema } = require('./subscription');

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    profilPicture: { type: String },
    theme: { type: String, default: 'light' },
    subscriptions: [SubscriptionSchema],
});

module.exports = {
    UserModel: mongoose.model('user', userSchema),
    UserSchema: userSchema,
};
