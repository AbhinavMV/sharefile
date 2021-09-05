import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;
if (MONGO_URI === "") throw Error("Enter mongodb uri in your environment variable");

let isConnected = false;

const connectDatabase = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    const connection = mongoose.connection;
    if (connection?.readyState >= 1) {
      console.log("🌍Connected to Database");
      return;
    }
    connection.on("error", () => console.log("Error connecting to database"));
  } catch (error) {
    console.log(error);
  }
};

export default connectDatabase;
