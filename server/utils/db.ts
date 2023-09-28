import mongoose, { set } from "mongoose";
require('dotenv').config();

const dbUrl:string = process.env.DATA_BASE || '';

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl).then((data:any) => {
            console.log(`Database connect with ${data.connection.host}`)
        })
    } catch (error: any) {
        console.log(error.message);
        setTimeout(connectDB, 5000)
    }
}

export default connectDB;