const mongoose = require("mongoose");
const dbUrl = process.env.dbUrl;
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`DB connected to ${conn.connection.host}`);
  } catch (e) {
    console.error(e);
    process.exit();
  }
};
module.exports = connectDB;
