const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
    products: [
        {
            product: { type: mongoose.Types.ObjectId, ref: 'Product' },
            count: Number,
            color: String,
        },
    ],
    status: {
        type: String,
        enum: ['Cancelled', 'Processing', 'Succeed'],
        default: 'Processing',
    },
    total: Number,
    coupon: String,
    orderBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
