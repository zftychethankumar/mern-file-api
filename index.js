const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const { StatusCode } = require('http-status-codes')
const connect = require('./db/config')

//port import
const PORT = process.env.PORT
//instance of express
const app = express()

//bodyparser middleware for incoming data
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

//middle
app.use(cors())

//index route
app.get(`/`, async (req,res) => {
    try {
        return res.status(StatusCodes.ACCEPTED).json({ status:true, msg:`Welcome to fileupload api.`})
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status:false, msg: err})
    }
})

//api route
app.use(`/api/file`, require('./route/fileRoute'))

//api route
app.all(`**`, async (req,res) => {
    try {
        return res.status(StatusCodes.NOT_FOUND).json({ status:false, msg:`requested path not found`})
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status:false, msg: err})
    }
})

//server listener
app.listen(PORT,() => {
   connectDb()
    console.log(`server is running @ http://localhost:${PORT}`)
})