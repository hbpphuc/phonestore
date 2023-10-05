const Topic = require('../models/topicModel');
const crud = require('./crudHandler');

exports.getAllTopic = crud.getAll(Topic);
exports.createTopic = crud.createOne(Topic);
exports.getTopic = crud.getOne(Topic);
exports.updateTopic = crud.updateOne(Topic);
exports.deleteTopic = crud.deleteOne(Topic);
