const mongoose = require('mongoose');
const slugify = require('slugify');

const brandSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: [true, 'A brand must have a name'],
        },
        slug: String,
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

brandSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true, locale: 'vi' });
    next();
});

brandSchema.virtual('products', {
    ref: 'Product',
    foreignField: 'brand',
    localField: '_id',
});

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
