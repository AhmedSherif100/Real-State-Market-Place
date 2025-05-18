const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController.js');
const authMiddleware = require('../middlewares/auth/authMiddleware');

// Public routes
router.get('/', propertyController.getAllProperties); // GET              /api/properties
router.get('/:id', propertyController.getPropertyById); // GET            /api/properties/:id

// Protected routes
router.use(authMiddleware.protect);
router.post('/', propertyController.createProperty);
router.patch('/:id', propertyController.updatePropertyById); // PATCH     /api/properties/:id
router.delete('/:id', propertyController.deletePropertyById); // DELETE   /api/properties/:id
//router.delete('/', propertyController.NUKE); // DELETE   /api/properties/:id
module.exports = router;
