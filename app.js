const express = require('express');
const dotenv = require('dotenv')
const path = require('path');
const morgan = require('morgan');
const connectDB = require('./config/db.js');

// Load config
dotenv.config({path: './config/config.env' })


connectDB()

const app = express();

app.use(express.urlencoded({extended: true})); 
app.use(express.json());


// logger - only use in dev mode
if (process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)

// Routes
app.use('/api/users',require('./routes/api/users'))

app.use(express.static(path.join(__dirname, 'public')));



module.exports = app;
