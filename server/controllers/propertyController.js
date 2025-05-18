const propertyModel = require('../models/propertyModel.js');
const catchAsync = require('../utils/catchAsync.js');
const appError = require('../utils/appError.js');
exports.createProperty = catchAsync(async (req, res) => {
  const newProperty = await propertyModel.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      property: newProperty,
    },
  });
});

exports.updatePropertyById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const property = await propertyModel.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!property) {
    return res.status(404).json({
      status: 'fail',
      message: `No property found with ID: ${id}`,
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      property,
    },
  });
});

exports.deletePropertyById = catchAsync(async (req, res) => {
  const { id } = req.params;

  // First check if the property exists
  const property = await propertyModel.findById(id);
  if (!property) {
    return res.status(404).json({
      status: 'fail',
      message: `No property found with ID: ${id}`,
    });
  }

  // Delete the property
  const deletedProperty = await propertyModel.findByIdAndDelete(id);

  // Double check if deletion was successful
  if (!deletedProperty) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to delete property. Please try again.',
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'Property deleted successfully',
    data: null,
  });
});

exports.getAllProperties = catchAsync(async (req, res) => {
  const properties = await propertyModel.find();

  res.status(200).json({
    status: 'success',
    results: properties.length,
    data: {
      properties,
    },
  });
});

exports.getPropertyById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const property = await propertyModel.findById(id);

  if (!property) {
    return res.status(404).json({
      status: 'fail',
      message: `No property found with ID: ${id}`,
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      property,
    },
  });
});

//this is not for use, for development to batch clean test/corrupted entries!!!!!!!!!
// exports.NUKE = catchAsync(async (req, res) => {
//   const deletedProperty = await propertyModel.deleteMany();

//   if (!deletedProperty) {
//     return res.status(404).json({
//       status: 'fail',
//       message: `No property found with ID: ${id}`,
//     });
//   }

//   res.status(200).json({
//     status: 'success',
//     data: null,
//   });
// });
