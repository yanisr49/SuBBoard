const mongoose = require("mongoose");

const subscriptionSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        note: {
            type: String,
            required: false
        },
        website_link: {
            type: String,
            required: false
        },
        logo_path: {
            type: String,
            required: false,
            default: "TODO"
        },
        periods: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Period"
            }
        ]
    },
    { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);