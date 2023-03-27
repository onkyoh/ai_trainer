const mongoose = require('mongoose')

mongoose.set({strictQuery: false})

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL)
    } catch (e) {
        process.exit(1)
    }
}

const closeDB = async () => {
   await mongoose.disconnect()
}

module.exports = {
    connectDB,
    closeDB
}