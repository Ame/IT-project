// package used to connect to database
const mongoose = require('mongoose')

// try connect to database, log if successful or not
const connectDB = async () => {
  try {
    // Pass in Database key
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

module.exports = connectDB
