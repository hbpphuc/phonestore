const mongoose = require('mongoose');
const slugify = require('slugify');

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: [true, 'A category must has a name'],
        },
        slug: String,
    },
    { timestamps: true }
);

categorySchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true, locale: 'vi' });
    next();
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
