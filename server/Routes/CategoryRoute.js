const { addCategory, getCategories } = require('../Controllers/CategoryController');
const { authMiddleware } = require('../Middlewares/AuthMiddleware');
const router = require("express").Router();

router.post('/addCategory',  addCategory);
router.get('/getCategories',  getCategories);

module.exports = router;