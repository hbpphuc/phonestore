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

    if (!post.likes.includes(req.user.id)) {
        result = await Post.findByIdAndUpdate(
            req.params.id,
            { $push: { likes: req.user.id } },
            { new: true }
        );
    } else {
        result = await Post.findByIdAndUpdate(
            req.params.id,
            { $pull: { likes: req.user.id } },
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
