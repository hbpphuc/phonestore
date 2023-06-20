const userRouter = require('./user.routes');
const productRouter = require('./product.routes');
const postRouter = require('./post.routes');
const categoryRouter = require('./category.routes');
const topicRouter = require('./topic.routes');
const reviewRouter = require('./review.routes');
const brandRouter = require('./brand.routes');

module.exports = {
    userRouter,
    productRouter,
    categoryRouter,
    postRouter,
    topicRouter,
    reviewRouter,
    brandRouter,
};
