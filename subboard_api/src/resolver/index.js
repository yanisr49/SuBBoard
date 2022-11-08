const { UserModel } = require('../model');
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
    addSubscription: async ({ email, name }) => {
        const newSubscription = {
            name,
            color: '#' + Math.floor(Math.random() * 16777215).toString(16),
        };
        const user = await UserModel.findOne({ email });
        user.subscriptions.push(newSubscription);
        await user.save();
        return newSubscription;
    },
    theme: async ({ theme }, { email }) => {
        const user = await UserModel.findOne({ email });
        user.theme = theme;
        await user.save();

        return theme;
    },
    ttDays: async ({day, month, year}, {email}) => {
        const filters = {userEmail: email, day, month, year};
        Object.keys(filters).forEach(key => !filters[key] && delete filters[key])
        return TTDaysModel.find(filters);
    },
    addTTDay: async ({ day, month, year }, { email }) => {
        const newTTDay = new TTDaysModel({
            userEmail: email,
            day,
            month,
            year,
        });
        await newTTDay.save();

        await sleep(1000);

        return newTTDay;
    },
    removeTTDay: async ({ day, month, year }, { email }) => {
        const filters = {userEmail: email, day, month, year};
        Object.keys(filters).forEach(key => !filters[key] && delete filters[key])

        const returnData = TTDaysModel.findOne(filters).cast();

        await TTDaysModel.deleteMany(filters);

        await sleep(1000);

        return returnData;
    }
};

module.exports = resolvers;
