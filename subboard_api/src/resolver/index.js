const { UserModel, SubscriptionModel } = require('../model');
const { TTDaysSchema, TTDaysModel } = require('../model/ttDays');

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

const resolvers = {
    user: async (_, {email}) => {
        return UserModel.findOne({ email: email });
    },
    subscriptions: async ({ name }, { email }) => {
        if(name) {
            return SubscriptionModel.find({ userEmail: email, name });
        } else {
            return SubscriptionModel.find({ userEmail: email });
        }
    },
    addSubscription: async ({ name, logo, color, dueDate, frequency, customFrequency, price, promotion, endDatePromotion }, { email }) => {
        const newSubscription = new SubscriptionModel({
            userEmail: email,
            initDate: new Date(),
            name,
            logo,
            color,
            dueDate,
            frequency,
            customFrequency,
            price,
            promotion,
            endDatePromotion,
        });
        await newSubscription.save();
        return newSubscription;
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
