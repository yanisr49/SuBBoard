require('dotenv').config();
require('./config/database').connect();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// importing user context
const { UserModel } = require('./model');

const { OAuth2Client } = require('google-auth-library');
const { CLIENT_ID, REDIRECT_UI, TOKEN_KEY } = process.env;

// Login
app.post('/login', async (req, res) => {
    const cookie_g_csrf_token = req.cookies.g_csrf_token;
    const { credential, g_csrf_token } = req.body;

    if (
        !cookie_g_csrf_token ||
        !g_csrf_token ||
        cookie_g_csrf_token !== g_csrf_token
    ) {
        res.status(401).send('Invalid CSRF token');
        return;
    }

    const client = new OAuth2Client(CLIENT_ID);
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        return { userEmail: payload['email'], userPicture: payload['picture'] };
    }
    const { userEmail, userPicture } = await verify().catch((reason) =>
        res.status(403).send(reason)
    );

    try {
        const user = await UserModel.findOne({ email: userEmail });

        // Create token
        const token = jwt.sign(
            { email: userEmail, picture: userPicture },
            TOKEN_KEY,
            {
                expiresIn: '2h',
            }
        );

        if (user) {
            res.status(200).redirect(REDIRECT_UI + token);
        } else {
            // Create user in our database

            await UserModel.create({
                email: userEmail,
                token,
            });

            // save user token
            res.status(201).redirect(REDIRECT_UI + token);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

const { graphqlHTTP } = require('express-graphql');
const graphQlSchema = require('./schema');
const graphQlResolvers = require('./resolver');
const verifyToken = require('./midlleware/auth');
const { unless } = require('express-unless');

// Configuration du middleware GraphQL
verifyToken.unless = unless;
app.use(verifyToken.unless({ path: ['/login'] }));
app.use(
    '/graphql',
    graphqlHTTP(async (req, res) => ({
        schema: graphQlSchema,
        rootValue: graphQlResolvers,
        context: {
            token:
                req.body.token ||
                req.query.token ||
                req.headers['x-access-token'],
        },
        graphiql: true,
    }))
);

module.exports = app;
