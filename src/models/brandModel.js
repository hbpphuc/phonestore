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
    { timestamps: true }
);

brandSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true, locale: 'vi' });
    next();
});

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
