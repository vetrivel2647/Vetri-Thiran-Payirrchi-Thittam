const { fetchWeather } = require('../services/weatherService');
const Weather = require('../models/Weather');
// @desc    Get current weather for a city
// @route   GET /api/weather/:city
// @access  Public
async function getWeather(req, res) {
  try {
    const { city } = req.params;

    if (!city || city.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Please provide a city name'
      });
    }

    const weatherData = await fetchWeather(city);
    await Weather.create({
      city: weatherData.city,
      temperature: weatherData.temperature,
      humidity: weatherData.humidity,
      windSpeed: weatherData.windSpeed,
      condition: weatherData.condition,
      description: weatherData.description || weatherData.condition,
      ismock: weatherData.ismock,
    });
    return res.status(200).json({
      success: true,
      data: weatherData
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

const getHistory = async (req, res) => {
  try {
    const history=await Weather.find().sort({createdAt:-1});
    return res.status(200).json({
      success: true,
      data: history
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
async function getWeathersummary(req, res) {
  try {
    const { city, temperature,humidity, condition } = req.body;
    const summary = `For ${condition} weather around ${temperature}°C and humidity ${humidity}% in ${city}, you'll want to wear breathable, quick-drying clothes and carry an umbrella if needed.`;
    return res.status(200).json({
      success: true,
      summary: summary
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}
async function getWeatherrecommendation(req, res) {
  try {
    const { city, condition } = req.body;
    const recommendation = `Based on the ${condition} weather in ${city}, it's recommended to wear comfortable clothing suited for this climate and stay prepared for outdoor conditions.`;
    return res.status(200).json({
      success: true,
      recommendation: recommendation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}
module.exports = {
  getWeather,getHistory,getWeathersummary,getWeatherrecommendation
};
