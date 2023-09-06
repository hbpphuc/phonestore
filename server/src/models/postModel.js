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
            type: mongoose.Types.ObjectId,
            ref: 'Topic',
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
        imageCover: {
            type: String,
            default:
                'https://res.cloudinary.com/dqsmvz7lv/image/upload/v1693997309/Phonestore/aal8bqkgxdf6sjhxqegf.jpg',
        },
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
        path: 'topic',
        select: 'name slug',
    });
    next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
