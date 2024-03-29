require('dotenv').config();
require('./config/database').connect();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors')
const { CLIENT_ID, FRONT_URI, JWT_SECRET, DOMAIN, ENV } = process.env;

const app = express();

app.use(cors(
    {
      origin: FRONT_URI,
      credentials: true,
    }
));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// importing user context
const { UserModel } = require('./model');

const { OAuth2Client } = require('google-auth-library');

// Login
app.post('/login', async (req, res) => {
    const { credential } = req.body;

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
        {
            res.status(403).send(reason)
        }
    );

    // Récupère l'utilisateur en base ou le créer
    try {
        let user = await UserModel.findOne({ email: userEmail });

        if (user) {
            const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '7d' });
            res.cookie('access_token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                domain: DOMAIN,
            })
            res.cookie('access_token_present', '', {
                httpOnly: false,
                secure: true,
                sameSite: 'strict',
                domain: DOMAIN,
            })

            res.status(200).json({
                message: 'Login successfully',
                user,
            });
        } else {
            // Create user in our database
            user = await UserModel.create({
                email: userEmail,
                profilPicture: userPicture,
            });

            const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '7d' });

            res.cookie('access_token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                domain: DOMAIN,
            })
            res.cookie('access_token_present', '', {
                httpOnly: false,
                secure: true,
                sameSite: 'strict',
                domain: DOMAIN,
            })

            res.status(201).json({
                message: 'Signup successfully',
                user,
            });
        }
        res.end();
    } catch (err) {
        res.status(500).send(err);
    }
});

// Logout
app.get('/logout', async (req, res) => {
    res.clearCookie("access_token", {
        domain: DOMAIN,
    });
    res.clearCookie("access_token_present", {
        domain: DOMAIN,
    });
    res.status(204);
    res.send('Cookie cleared');
    res.end();
});

const { graphqlHTTP } = require('express-graphql');
const graphQlSchema = require('./schema');
const graphQlResolvers = require('./resolver');
const checkTokenMiddleware = require('./middleware/auth');
const { unless } = require('express-unless');

// Configuration du middleware GraphQL
checkTokenMiddleware.unless = unless;
app.use(checkTokenMiddleware.unless({ path: ['/login', /*'/graphql'*/] }));

app.use(
    '/graphql',
    graphqlHTTP(async (req, res) => ({
        schema: graphQlSchema,
        rootValue: graphQlResolvers,
        context: {
            // email: "yanisrichard21@gmail.com"
            email: jwt.decode(req.cookies.access_token).email,
        },
        graphiql: true,
    }))
);

module.exports = app;
