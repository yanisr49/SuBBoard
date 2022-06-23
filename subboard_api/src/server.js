require('dotenv').config();
require('./config/database').connect();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors')

const app = express();

app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());


// importing user context
const { UserModel } = require('./model');

const { OAuth2Client } = require('google-auth-library');
const { CLIENT_ID, REDIRECT_UI, JWT_SECRET } = process.env;

// Login
app.post('/login', async (req, res) => {
    // Vérifie que le csrf token est valide
    /*
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
    */

    // Check auprès de GOOGLE que le token est valide
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

    // Récupère l'utilisateur en base ou le créer
    try {
        let user = await UserModel.findOne({ email: userEmail });

        if (user) {
            res.status(200).redirect(REDIRECT_UI + jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' }));
        } else {
            // Create user in our database
            user = await UserModel.create({
                email: userEmail,
                profilPicture: userPicture,
            });

            // save user token
            res.status(201).redirect(REDIRECT_UI + jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' }));
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

const { graphqlHTTP } = require('express-graphql');
const graphQlSchema = require('./schema');
const graphQlResolvers = require('./resolver');
const checkTokenMiddleware = require('./middleware/auth');
const { unless } = require('express-unless');

// Configuration du middleware GraphQL
checkTokenMiddleware.unless = unless;
app.use(checkTokenMiddleware.unless({ path: ['/', '/login'] }));
app.use(
    '/graphql',
    graphqlHTTP(async (req, res) => ({
        schema: graphQlSchema,
        rootValue: graphQlResolvers,
        context: {
            email: jwt.decode(req.headers.authorization.split('Bearer ')[1]).email,
        },
        graphiql: true,
    }))
);

module.exports = app;
