const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const passport = require('passport');
const session = require('express-session');

// const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const compression = require('compression');

const { globalErrorHandler } = require('./src/utils/');
const initRoutes = require('./src/routes');

const oauthConfig = require('./src/configs/oauth.config');

const app = express();

app.enable('trust proxy');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
};

app.use(cors(corsOptions));

app.use(
    helmet({
        contentSecurityPolicy: false,
    })
);

const limiter = rateLimit.rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    message: 'Too many request from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Development environment logging
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

app.use(session({ secret: 'SECRET' }));

app.use(passport.initialize());
app.use(passport.session());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

app.use(compression());

initRoutes(app);

app.use(globalErrorHandler);

module.exports = app;
