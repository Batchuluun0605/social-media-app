import mongoose from "mongoose";

const connectMongoDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Mongo connected :${connect.connection.host}`);
  } catch (error) {
    console.error(`Error connection to mongoDb : ${error.message}`);
    process.exit(1);
  }
};

export default connectMongoDb;
