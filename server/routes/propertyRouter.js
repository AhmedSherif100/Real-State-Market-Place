const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController.js');

// RESTful Routes (HTTP  + Path) ;)
router.post('/', propertyController.createProperty); // POST              /api/properties
router.get('/', propertyController.getAllProperties); // GET              /api/properties
router.get('/:id', propertyController.getPropertyById); // GET            /api/properties/:id
router.patch('/:id', propertyController.updatePropertyById); // PATCH     /api/properties/:id
router.delete('/:id', propertyController.deletePropertyById); // DELETE   /api/properties/:id

module.exports = router;
