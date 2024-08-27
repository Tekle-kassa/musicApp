import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();
const connectdb = async (): Promise<void> => {
  try {
    const connectionString = process.env.CONNECTION_STRING as string;
    const connect = await mongoose.connect(connectionString);
    console.log(
      "database connected: ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
export default connectdb;
