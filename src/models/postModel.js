const mongoose = require('mongoose');
const { default: slugify } = require('slugify');

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'A post must have a title'],
        },
        description: {
            type: String,
            required: [true, 'A post must have a description'],
        },
        topic: {
            type: String,
            required: [true, 'A post must have a topic'],
        },
        summary: {
            type: String,
            required: [true, 'A post must have a summary'],
        },
        slug: String,
        views: {
            type: String,
            default: 0,
        },
        likes: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'User',
            },
        ],
        dislikes: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'User',
            },
        ],
        thumbnail: {
            type: String,
            default: 'default-post.jpg',
        },
        images: [String],
        author: {
            type: String,
            default: 'Administrator',
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

postSchema.pre('save', function (next) {
    this.slug = slugify(this.summary, { lower: true, locale: 'vi' });
    next();
});

postSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'likes dislikes',
        select: 'name -_id',
    });
    next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
