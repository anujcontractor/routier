const express = require('express');
const favoritesController = require('../controller/favourtieController');

const router = express.Router();

router.post('/add', favoritesController.addFavorite);
router.delete('/remove', favoritesController.removeFavorite);
router.get('/user/:userId', favoritesController.getFavorites);

module.exports = router;
