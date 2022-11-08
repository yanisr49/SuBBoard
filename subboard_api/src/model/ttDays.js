const mongoose = require('mongoose');

const ttDaysSchema = new mongoose.Schema({
    userEmail: { type: String },
    day: { type: Number },
    month: { type: Number },
    year: { type: Number },
});

module.exports = {
    TTDaysModel: mongoose.model('ttDays', ttDaysSchema),
    TTDaysSchema: ttDaysSchema,
};
