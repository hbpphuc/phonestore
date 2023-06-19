const Topic = require('../models/categoryModel');
const crud = require('./crudHandler');

exports.getAllTopic = crud.getAll(Topic);
exports.createTopic = crud.createOne(Topic);
exports.getTopic = crud.getOne(Topic);
exports.updateTopic = crud.updateOne(Topic);
exports.deleteTopic = crud.deleteOne(Topic);
