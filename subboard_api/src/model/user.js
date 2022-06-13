const mongoose = require('mongoose');
const { SubscriptionSchema } = require('./subscription');

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    token: { type: String },
    subscriptions: [SubscriptionSchema],
});

module.exports = {
    UserModel: mongoose.model('user', userSchema),
    UserSchema: userSchema,
};
