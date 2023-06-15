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
            type: String,
            required: [true, 'A product must have a brand'],
        },
        price: {
            type: Number,
            required: [true, 'A product must have a price'],
        },
        category: {
            type: mongoose.Types.ObjectId,
            ref: 'Category',
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
        ratings: [
            {
                star: { type: Number },
                postedBy: { type: mongoose.Types.ObjectId, ref: 'User' },
                comment: { type: String },
            },
        ],
        totalRatings: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

productSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
