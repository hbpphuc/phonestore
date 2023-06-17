const Category = require('../models/categoryModel');
const CRUD = require('./crudHandler');

exports.getAllCategory = CRUD.getAll(Category);
exports.createCategory = CRUD.createOne(Category);
exports.getCategory = CRUD.getOne(Category);
exports.updateCategory = CRUD.updateOne(Category);
exports.deleteCategory = CRUD.deleteOne(Category);
