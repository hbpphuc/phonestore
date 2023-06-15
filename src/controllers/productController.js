const CRUD = require('./crudHandler');
const Product = require('../models/productModel');

exports.getAllProduct = CRUD.getAll(Product);
exports.createProduct = CRUD.createOne(Product);
exports.getProduct = CRUD.getOne(Product);
exports.updateProduct = CRUD.updateOne(Product);
exports.deleteProduct = CRUD.deleteOne(Product);
