const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');
const crud = require('./crudHandler');

exports.getAllPost = crud.getAll(Post);
exports.createPost = crud.createOne(Post);
exports.getPost = crud.getOne(Post);
exports.updatePost = crud.updateOne(Post);
exports.deletePost = crud.deleteOne(Post);

exports.liking = asyncHandler(async (req, res, next) => {
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

exports.disliking = asyncHandler(async (req, res, next) => {
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
