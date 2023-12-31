const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');
const crud = require('./crudHandler');
const uploadCloud = require('../configs/cloudinary.config');

exports.populatedImage = uploadCloud.fields([
    { name: 'imageCover', maxCount: 1 },
]);

exports.uploadPostImages = asyncHandler(async (req, res, next) => {
    const post = await Post.findByIdAndUpdate(
        req.params.id,
        {
            imageCover: req.files.imageCover[0].path,
        },
        { new: true }
    ).select('title imageCover');

    res.status(200).json({
        data: {
            post,
        },
    });
});

exports.getAllPost = crud.getAll(Post);
exports.createPost = crud.createOne(Post);
exports.getPost = crud.getOne(Post);
exports.getPostSlug = crud.getOneSlug(Post);
exports.updatePost = crud.updateOne(Post);
exports.deletePost = crud.deleteOne(Post);

exports.like = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id);

    let result;
    const user = req.user.id;
    const likedUser = post.likes.includes(user);
    const dislikedUser = post.dislikes.includes(user);

    if (!likedUser || dislikedUser) {
        result = await Post.findByIdAndUpdate(
            req.params.id,
            { $push: { likes: user }, $pull: { dislikes: user } },
            { new: true }
        );
    } else {
        result = await Post.findByIdAndUpdate(
            req.params.id,
            { $pull: { likes: user } },
            { new: true }
        );
    }

    res.status(200).json({
        status: 'success',
        data: {
            result,
        },
    });
});

exports.dislike = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id);

    let result;
    const user = req.user.id;
    const dislikedUser = post.dislikes.includes(user);
    const likedUser = post.likes.includes(user);

    if (likedUser || !dislikedUser) {
        result = await Post.findByIdAndUpdate(
            req.params.id,
            { $push: { dislikes: user }, $pull: { likes: user } },
            { new: true }
        );
    } else {
        result = await Post.findByIdAndUpdate(
            req.params.id,
            { $pull: { dislikes: user } },
            { new: true }
        );
    }

    res.status(200).json({
        status: 'success',
        data: {
            result,
        },
    });
});
