const User = require('./user');
const Subscription = require('./subscription');
const TTDays = require('./ttDays');

module.exports = { ...User, ...Subscription, ...TTDays };
