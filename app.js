const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { AppError, globalErrorHandler } = require('./src/utils/');
const { userRouter, productRouter } = require('./src/routes/');

const app = express();

const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));
// Development environment logging
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
// Body parser, reading data from body into req.body
app.use(bodyParser.json({ limit: '10kb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);

app.all('*', function (req, res, next) {
    next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
