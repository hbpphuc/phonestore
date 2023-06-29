const Category = require('../models/categoryModel');
const crud = require('./crudHandler');

exports.getAllCategory = crud.getAll(Category, {
    path: 'products',
    select: '-category -createdAt -updatedAt -__v -_id',
});
exports.createCategory = crud.createOne(Category);
exports.getCategory = crud.getOne(Category);
exports.updateCategory = crud.updateOne(Category);
exports.deleteCategory = crud.deleteOne(Category);
