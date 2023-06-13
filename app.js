const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const productRouter = require('./src/routes/product.routes');

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
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use('/api/v1/products', productRouter);

app.all('*', function (req, res, next) {
    next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

module.exports = app;
