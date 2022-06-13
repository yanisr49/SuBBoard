const { UserModel } = require('../model');
const jwt = require('jsonwebtoken');
const { TOKEN_KEY } = process.env;

const resolvers = {
    user: async ({ email }, { token }) => {
        if (email === jwt.verify(token, TOKEN_KEY).email) {
            return UserModel.findOne({ email });
        }
        return null;
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
