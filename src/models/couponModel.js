const mongoose = require('mongoose');
const voucherCodes = require('voucher-code-generator');

const couponSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A coupon must have a name'],
            uppercase: true,
        },
        discount: {
            type: String,
            required: [true, 'A coupon must have a discount'],
        },
        code: {
            type: String,
        },
        expire: {
            type: Date,
        },
    },
    { timestamps: true }
);

couponSchema.pre('save', function (next) {
    this.expire = Date.now() + 15 * 24 * 60 * 60 * 1000;
    this.code = voucherCodes
        .generate({
            length: 8,
            count: 1,
            prefix: 'Phonestore-',
            // postfix: '-2023',
            charset: voucherCodes.charset('alphanumeric'),
        })
        .join('');
    next();
});

const Coupon = mongoose.model('Coupon', couponSchema);
module.exports = Coupon;
