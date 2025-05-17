const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/auth/authMiddleware');
const propertyController = require('../controllers/propertyController');

// All Routes are protected to admin role only
router.use(authMiddleware.protect, authMiddleware.restrictTo('admin'));

router.get('/properties/', propertyController.getAllProperties);
router.get('/properties/:id', propertyController.getPropertyById);
router.post('/properties/', propertyController.createProperty);
router.patch('/properties/:id', propertyController.updatePropertyById);
router.delete('/properties/:id', propertyController.deletePropertyById);

module.exports = router;
