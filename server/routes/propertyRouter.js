const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController.js');
const authMiddleware = require('../middlewares/auth/authMiddleware');

// RESTful Routes (HTTP  + Path)
router.get('/', propertyController.getAllProperties); // GET              /api/properties
router.get('/:id', propertyController.getPropertyById); // GET            /api/properties/:id

// Protected Routes [User must be logged in]
//router.use(authMiddleware.protect);
router.post('/', propertyController.createProperty);
router.patch('/:id', propertyController.updatePropertyById); // PATCH     /api/properties/:id
router.delete('/:id', propertyController.deletePropertyById); // DELETE   /api/properties/:id
//router.delete('/', propertyController.NUKE); // DELETE   /api/properties/:id
module.exports = router;
