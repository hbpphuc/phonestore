const expressAsyncHandler = require('express-async-handler');
const crud = require('./crudHandler');
const Brand = require('../models/brandModel');

exports.getAllBrand = crud.getAll(Brand);
exports.createBrand = crud.createOne(Brand);
exports.getBrand = crud.getOne(Brand, {
    path: 'products',
    select: ' -brand',
});
exports.updateBrand = crud.updateOne(Brand);
exports.deleteBrand = crud.deleteOne(Brand);

exports.findManyBrand = expressAsyncHandler(async (req, res, next) => {
    const { bIds } = req.query;
    const brands = await Brand.find({ _id: { $in: bIds } });

    if (!brands) return next(new AppError('There is no brand.', 404));

    res.status(200).json({
        status: 'success',
        results: brands.length,
        data: {
            brands,
        },
    });
});
