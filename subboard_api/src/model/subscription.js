const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    name: { type: String },
    color: { type: String },
});

module.exports = {
    SubscriptionModel: mongoose.model('subscription', subscriptionSchema),
    SubscriptionSchema: subscriptionSchema,
};
