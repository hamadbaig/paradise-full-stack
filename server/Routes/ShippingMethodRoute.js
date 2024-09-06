const { addShippingMethod, getShippingMethod } = require('../Controllers/ShippingMethodController');
const { authMiddleware } = require('../Middlewares/AuthMiddleware');
const router = require("express").Router();

router.post('/addShippingMethod',  addShippingMethod);
router.get('/getShippingMethod',  getShippingMethod);

module.exports = router;