const { AppError } = require('../utils');
const userRouter = require('./user.routes');
const productRouter = require('./product.routes');
const postRouter = require('./post.routes');
const categoryRouter = require('./category.routes');
const topicRouter = require('./topic.routes');
const reviewRouter = require('./review.routes');
const brandRouter = require('./brand.routes');
const couponRouter = require('./coupon.routes');
const orderRouter = require('./order.routes');

const initRoutes = (app) => {
    app.use('/api/v1/categories', categoryRouter);
    app.use('/api/v1/products', productRouter);
    app.use('/api/v1/topics', topicRouter);
    app.use('/api/v1/posts', postRouter);
    app.use('/api/v1/reviews', reviewRouter);
    app.use('/api/v1/coupons', couponRouter);
    app.use('/api/v1/brands', brandRouter);
    app.use('/api/v1/users', userRouter);
    app.use('/api/v1/orders', orderRouter);

    app.all('*', function (req, res, next) {
        next(new AppError(`Route ${req.originalUrl} not found`, 404));
    });
};

module.exports = initRoutes;
