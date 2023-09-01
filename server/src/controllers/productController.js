const asyncHandler = require('express-async-handler');

const crud = require('./crudHandler');
const Product = require('../models/productModel');
const { AppError } = require('../utils');
const uploadCloud = require('../configs/cloudinary.config');

exports.populatedImages = uploadCloud.fields([
    { name: 'imageCover', maxCount: 1 },
    { name: 'images', maxCount: 10 },
]);

exports.uploadProductImages = asyncHandler(async (req, res, next) => {
    if (!req.files.imageCover || !req.files.images) {
        return next(new AppError('There is no image cover or images.', 404));
    }

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            imageCover: req.files.imageCover[0].path,
            $push: {
                images: { $each: req.files.images.map((file) => file.path) },
            },
        },
        { new: true }
    ).select('name imageCover images');

    res.status(200).json({
        data: {
            product,
        },
    });
});

exports.getAllProduct = crud.getAll(Product);
exports.createProduct = crud.createOne(Product);
exports.getProduct = crud.getOne(Product, {
    path: 'reviews',
    select: 'content rating user createdAt',
});
exports.getProductSlug = crud.getOneSlug(Product, {
    path: 'reviews',
    select: 'content rating user createdAt',
});
exports.updateProduct = crud.updateOne(Product);
exports.deleteProduct = crud.deleteOne(Product);

exports.searchProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.find({
        name: { $regex: req.query.name, $options: 'i' },
    });

    if (!product)
        return next(new AppError('There is no product with that name', 404));

    res.status(200).json({
        status: 'success',
        results: product.length,
        data: {
            product,
        },
    });
});

exports.getProductOnCategory = asyncHandler(async (req, res, next) => {
    const products = await Product.find({ category: req.params.type });

    if (!products) return next(new AppError('There is no product.', 404));

    res.status(200).json({
        status: 'success',
        results: products.length,
        data: {
            products,
        },
    });
});
