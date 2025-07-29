import mongoose from "mongoose";

const connectToDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL}/todo_app`);
        console.log(
            `MongoDB connected successfully! DB HOST: ${connectionInstance.connection.host}`
        );
    } catch (error) {
        console.log(`Error: ${error}`);
        process.exit(1);
    }
}

export default connectToDB;