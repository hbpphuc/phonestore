const express = require('express');
const topicController = require('../controllers/topicController');

const router = express.Router();

router
    .route('/')
    .get(topicController.getAllTopic)
    .post(topicController.createTopic);

router
    .route('/:id')
    .get(topicController.getTopic)
    .put(topicController.updateTopic)
    .delete(topicController.deleteTopic);

module.exports = router;
