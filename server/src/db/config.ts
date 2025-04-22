import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.pluralize(null);
const connectDB = async()=>{
    const dbUrl = process.env.DB_URL;
    if(!dbUrl){
        console.log('Database url is not defined');
        process.exit(1);
    }
    try {
        await mongoose.connect(dbUrl);
        console.log('Database connected')
    } catch (error) {
        console.log('Database connection failed',error);
    }
}
connectDB();