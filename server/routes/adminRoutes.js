const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const propertyController = require('../controllers/propertyController');
const authMiddleware = require('../middlewares/auth/authMiddleware');

// All Routes are protected to admin role only
router.use(authMiddleware.protect, authMiddleware.restrictTo('admin'));

// Property routes
router
  .route('/properties')
  .get(propertyController.getAllProperties)
  .post(propertyController.createProperty);

router
  .route('/properties/:id')
  .get(propertyController.getPropertyById)
  .patch(propertyController.updatePropertyById)
  .delete(propertyController.deletePropertyById);

// User management routes
router.route('/users').get(adminController.getAllUsers);

router.patch('/users/:id/reactivate', adminController.reactivateUser);

router
  .route('/users/:id')
  .get(adminController.getUserById)
  .patch(adminController.updateUserById)
  .delete(adminController.deactivateUser);

module.exports = router;
