const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    WinstonLogger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    WinstonLogger.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
