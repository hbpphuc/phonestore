const userRouter = require('./user.routes');
const productRouter = require('./product.routes');
const postRouter = require('./post.routes');
const categoryRouter = require('./category.routes');
const topicRouter = require('./topic.routes');
const reviewRouter = require('./review.routes');
const brandRouter = require('./brand.routes');
const couponRouter = require('./coupon.routes');
const { AppError } = require('../utils');

const initRoutes = (app) => {
    app.use('/api/v1/users', userRouter);
    app.use('/api/v1/products', productRouter);
    app.use('/api/v1/categorys', categoryRouter);
    app.use('/api/v1/topics', topicRouter);
    app.use('/api/v1/posts', postRouter);
    app.use('/api/v1/reviews', reviewRouter);
    app.use('/api/v1/brands', brandRouter);
    app.use('/api/v1/coupons', couponRouter);

    app.all('*', function (req, res, next) {
        next(new AppError(`Route ${req.originalUrl} not found`, 404));
    });
};

module.exports = initRoutes;
