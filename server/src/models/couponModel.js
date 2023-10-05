const mongoose = require('mongoose');
const voucherCodes = require('voucher-code-generator');

const couponSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A coupon must have a name'],
            uppercase: true,
        },
        type: {
            type: String,
            required: [true, 'A coupon must have a type'],
        },
        discount: {
            type: Number,
            required: [true, 'A coupon must have a discount'],
        },
        code: [String],
        expire: {
            type: Date,
        },
    },
    { timestamps: true }
);

couponSchema.pre('save', function (next) {
    this.expire = Date.now() + 15 * 24 * 60 * 60 * 1000;
    this.code = voucherCodes.generate({
        length: 8,
        count: 3,
        prefix: 'Phonestore-',
        // postfix: '-2023',
        charset: voucherCodes.charset('alphanumeric'),
    });
    next();
});

const Coupon = mongoose.model('Coupon', couponSchema);
module.exports = Coupon;
