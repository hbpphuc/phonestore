const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const { AppError, globalErrorHandler } = require('./src/utils/');
const {
    userRouter,
    productRouter,
    categoryRouter,
    topicRouter,
    postRouter,
    reviewRouter,
    brandRouter,
} = require('./src/routes/');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

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
app.use('/api/v1/categorys', categoryRouter);
app.use('/api/v1/topics', topicRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/brands', brandRouter);

app.all('*', function (req, res, next) {
    next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
