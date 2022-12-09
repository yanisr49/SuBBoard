const { UserModel, SubscriptionModel } = require('../model');
const { TTDaysSchema, TTDaysModel } = require('../model/ttDays');
const { v4: uuidv4 } = require('uuid');

// function sleep(ms) {
//     return new Promise((resolve) => {
//         setTimeout(resolve, ms);
//     });
// }

const resolvers = {
    user: async (_, {email}) => {
        return UserModel.findOne({ email: email });
    },
    subscriptions: async ({ id }, { email }) => {
        if(id) {
            return SubscriptionModel.find({ userEmail: email, id });
        } else {
            return SubscriptionModel.find({ userEmail: email });
        }
    },
    createSubscription: async (_, { email }) => {
        const newSubscription = new SubscriptionModel({
            id: uuidv4(),
            userEmail: email,
            initDate: new Date(),
        });
        await newSubscription.save();
        return newSubscription;
    },
    editSubscription: async ({ id, ...data }, { email }) => {
        const sub = await SubscriptionModel.findOne({ id });
        Object.keys(data).forEach(key => {
            if(data[key] !== undefined) {
                sub[key] = data[key];
            }
        })
        await sub.save();
        return sub;
    },
    theme: async ({ theme }, { email }) => {
        const user = await UserModel.findOne({ email });
        user.theme = theme;
        await user.save();

        return theme;
    },
    ttDays: async ({startDate, endDate}, {email}) => {
        return TTDaysModel.find({userEmail: email}).where({date: {
            $gte: startDate,
            $lt: endDate,
        }});
    },
    addTTDay: async ({ date }, { email }) => {
        const newTTDay = new TTDaysModel({
            userEmail: email,
            date,
        });

        await newTTDay.save();

        return newTTDay;
    },
    removeTTDay: async ({ date }, { email }) => {
        const returnData = TTDaysModel.findOne({userEmail: email, date}).cast();

        await TTDaysModel.deleteMany({userEmail: email, date});

        return returnData;
    }
};

module.exports = resolvers;
