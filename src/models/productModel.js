const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A product must have a name'],
            trim: true,
            unique: true,
        },
        slug: {
            type: String,
        },
        description: {
            type: String,
        },
        brand: {
            type: mongoose.Types.ObjectId,
            ref: 'Brand',
            required: [true, 'A product must have a brand'],
        },
        price: {
            type: Number,
            required: [true, 'A product must have a price'],
        },
        category: {
            type: mongoose.Types.ObjectId,
            ref: 'Category',
            required: [true, 'A product must have a category'],
        },
        quantity: {
            type: Number,
            default: 0,
        },
        sold: {
            type: Number,
            default: 0,
        },
        imageCover: {
            type: String,
            required: [true, 'A product must have an image cover'],
        },
        images: [String],
        color: {
            type: String,
            enum: ['Black', 'White', 'Red'],
        },
        ratings_average: {
            type: Number,
            default: 0,
        },
        ratings_count: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    }
);

productSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true, locale: 'vi' });
    next();
});

productSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'product',
    localField: '_id',
});

productSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'brand category',
        select: 'name -_id',
    });
    next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
