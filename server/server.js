const dotenv = require('dotenv');
dotenv.config({ path: `../.env` });
const mongoose = require('mongoose');
const path = require('path');

// Internal Modules
const app = require('./app');

// Connect to MongoDB
const DB = process.env.DATABASE.replace(
  `<db_password>`,
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => {
    console.log(`DB connection is successful.`);
    const PORT = process.env.PORT || 3000;
    const server = app.listen(PORT, () => {
      console.log(`Application running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('DB connection failed: ', err);
    process.exit(1);
  });
