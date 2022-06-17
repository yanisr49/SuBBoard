const { UserModel } = require('../model');

const resolvers = {
    user: async (_, {email}) => {
        console.log(email)
        return UserModel.findOne({ email: email });
    },
    addSubscription: async ({ email, name }) => {
        const newSubscription = {
            name,
            color: '#' + Math.floor(Math.random() * 16777215).toString(16),
        };
        const user = await UserModel.findOne({ email });
        await user.subscriptions.push(newSubscription);
        user.save();
        return newSubscription;
    },
};

module.exports = resolvers;
