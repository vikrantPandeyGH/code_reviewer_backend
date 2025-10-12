import mongoose from "mongoose";

// function connect(){
//     mongoose.connect('mongodb://localhost:27017/AI_database').then(function(){
//         console.log('connected to databse successfully')
//     }).catch(err=>{
//         console.log(err)
//     })
// }

// export default connect



let isConnected = false;

export const connectToDB = async () => {
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};