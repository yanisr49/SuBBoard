const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    id: { type: String },
    userEmail: { type: String },
    initDate: { type: Date },
    name: { type: String },
    logo: { type: String },
    color: { type: String },
    dueDate: { type: Date },
    frequency: { type: String },
    customFrequency: {
        type: String,
        enum: [
            'DAILY',
            'WEEKLY',
            'BIMONTHLY',
            'MONTHLY',
            'BIQUARTERLY',
            'QUARTERLY',
            'BIANNUAL',
            'ANNUAL',
            'CUSTOM'
        ]
    },
    price: { type: Number },
    promotion: { type: Number },
    endDatePromotion: { type: Date }
});

module.exports = {
    SubscriptionModel: mongoose.model('subscription', subscriptionSchema),
    SubscriptionSchema: subscriptionSchema,
};
