const mongoose = require('mongoose');

const ttDaysSchema = new mongoose.Schema({
    userEmail: { type: String },
    date: { type: Date },
});

module.exports = {
    TTDaysModel: mongoose.model('ttDays', ttDaysSchema),
    TTDaysSchema: ttDaysSchema,
};
