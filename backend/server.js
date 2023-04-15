const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const { connectDB } = require('./config/db')
require('express-async-errors')

const port = process.env.PORT || 5000

connectDB()

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/plans', require('./routes/planRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

const server = app.listen(port, () => {
    console.log('listening!!')
})

const stopServer = () => {
    server.close()
}

module.exports = stopServer