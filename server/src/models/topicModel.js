const mongoose = require('mongoose');
const slugify = require('slugify');

const topicSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: [true, 'A topic must have a name'],
        },
        slug: String,
    },
    { timestamps: true }
);

topicSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true, locale: 'vi' });
    next();
});

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;
