const Category = require('../models/categoryModel');
const crud = require('./crudHandler');

exports.getAllCategory = crud.getAll(Category);
exports.createCategory = crud.createOne(Category);
exports.getCategory = crud.getOne(Category);
exports.updateCategory = crud.updateOne(Category);
exports.deleteCategory = crud.deleteOne(Category);
