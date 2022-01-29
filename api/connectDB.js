const mongoose = require('mongoose');
const env = process.env;

const mongoUrl = () => {
  return `mongodb://${env.MONGO_USERNAME}:${env.MONGO_PASSWORD}@${env.MONGO_HOSTNAME}:${env.MONGO_PORT}/${env.MONGO_DB}?authSource=terminal_db`;
};

const connectDB = () => {
  if (mongoose.connections[0].readyState) {
    // console.log('Already connected to MongoDB')
    return;
  }
  mongoose.connect(
    mongoUrl(),
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    err => {
      if (err) {
        console.log(`Can't connect to MongoDB ${err}`);
        throw err;
      }
      console.log('Successfully connected to mongodb');
    },
  );
};

module.exports = connectDB;
