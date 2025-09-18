import mongoose from 'mongoose'


//function for connecting to database
const connectDb = () => {
    mongoose.connect(process.env.MONGO_URI).then((conn) => console.log("db connected successfully " + conn.connection.host)).catch((err) => {
        console.log(err.message)
    })
}

export {connectDb}