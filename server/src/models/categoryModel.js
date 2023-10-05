const mongoose = require('mongoose');
const slugify = require('slugify');

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: [true, 'A category must have a name'],
        },
        slug: String,
        brands: [{ type: mongoose.Types.ObjectId, ref: 'Brand' }],
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

categorySchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true, locale: 'vi' });
    next();
});

categorySchema.virtual('products', {
    ref: 'Product',
    foreignField: 'category',
    localField: '_id',
});

categorySchema.pre(/^find/, function (next) {
    this.populate({
        path: 'brands',
        select: '-createdAt -updatedAt',
    });
    next();
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
