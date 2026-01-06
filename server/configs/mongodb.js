import mongoose from "mongoose";

const connectDB=async()=>{
    mongoose.connection.on('connected',()=>{
        console.log("MongoDB connected successfully");
    })
try {
    
    await mongoose.connect(`${process.env.MONGO_URL}`)
} catch (error) {
    console.log("MongoDb Connection Failed",error);
}
}

export default connectDB;