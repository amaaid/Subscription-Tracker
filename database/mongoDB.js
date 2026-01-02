import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";
import process from "process";

if(!DB_URI)
{
    throw new Error('Please define the DB_URI environment variable in .env.*.local');
}

const connectToDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log(`Connected to the database in ${NODE_ENV} mode`);
    } catch (error) {
        console.log('Error connecting to the database', error);
        process.exit(1);
    }
}

export default connectToDB;