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
  const id = req.params;
  const property = await propertyModel.findById(id);
  if (!property) {
    return res.status(404).json({
      status: 'fail',
      message: `No property found with ID: ${id}`,
    });
    //there is alot of arch descions to be made here , contact me for info (darawi) , getting back to it later in the day isa!
  }
});

exports.deletePropertyById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deletedProperty = await propertyModel.findByIdAndDelete(id);

  if (!deletedProperty) {
    return res.status(404).json({
      status: 'fail',
      message: `No property found with ID: ${id}`,
    });
  }

  res.status(200).json({
    status: 'success',
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
