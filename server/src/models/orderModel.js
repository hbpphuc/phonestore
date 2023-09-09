const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
    {
        products: [
            {
                product: { type: mongoose.Types.ObjectId, ref: 'Product' },
                count: Number,
                color: String,
            },
        ],
        status: {
            type: String,
            enum: ['Canceled', 'Shipping', 'Delivered'],
            default: 'Shipping',
        },
        total: Number,
        coupon: String,
        orderBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// orderSchema.pre(/^find/, function (next) {
//     this.populate({
//         path: 'products.product',
//         select: 'name',
//     });
//     next();
// });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
