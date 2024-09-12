const express = require('express');
const router = express.Router();
const votesController = require('../controllers/votesController');

router.get('/', votesController.getAllVotes);
router.post('/', votesController.storeVote);

module.exports = router;
