import mongoose from "mongoose";

const connectDb = async()=>{
    try {
        const connected = await mongoose.connect('mongodb+srv://sayanatsudheesh:bTOE9yo5CFRtVyEm@cluster0.2vwv1u9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log('mongodb connected successfully')
    } catch (error) {
        console.log(error)
    }
}

export default connectDb