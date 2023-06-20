const Brand = require('../models/brandModel');
const crud = require('./crudHandler');

exports.getAllBrand = crud.getAll(Brand);
exports.createBrand = crud.createOne(Brand);
exports.getBrand = crud.getOne(Brand);
exports.updateBrand = crud.updateOne(Brand);
exports.deleteBrand = crud.deleteOne(Brand);
