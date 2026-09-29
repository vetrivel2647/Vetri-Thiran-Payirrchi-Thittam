const express = require('express');
const router = express.Router();
const { getWeather,getHistory,getWeathersummary,getWeatherrecommendation } = require('../controllers/weatherController');
const { protect } = require('../middleware/authMiddleware');
router.get('/history',protect, getHistory);
router.get('/:city', protect, getWeather);
router.post('/summary', protect, getWeathersummary);
router.post('/recommendation', protect, getWeatherrecommendation);
module.exports = router;
