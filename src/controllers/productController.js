const asyncHandler = require('express-async-handler');
const multer = require('multer');
const sharp = require('sharp');
const crud = require('./crudHandler');
const Product = require('../models/productModel');
const { AppError } = require('../utils');

exports.getAllProduct = crud.getAll(Product);
exports.createProduct = crud.createOne(Product);
exports.getProduct = crud.getOne(Product);
exports.updateProduct = crud.updateOne(Product);
exports.deleteProduct = crud.deleteOne(Product);

exports.searchProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.find({
        name: { $regex: req.query.name, $options: 'i' },
    });

    if (!product)
        return next(new AppError('There is no product with this name', 404));

    res.status(200).json({
        status: 'success',
        results: product.length,
        data: {
            product,
        },
    });
});
