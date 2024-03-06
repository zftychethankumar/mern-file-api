const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const { StatusCodes } = require('http-status-codes')

const connectDb = require('./db/config')

//port import
const PORT = process.env.PORT
//instance of express
const app = express()

//declare document folder  as static
app.use(express.static('documents'))
app.use(express.static('view'))

//bodyparser middleware for incoming data
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

//middle
app.use(cors())

//template engine settings
app.set('view engine', 'ejs');
app.set('views','./view');

//index route
app.get(`/`, async (req,res) => {
    try {
        return res.render('index.ejs')
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status:false, msg: err})
    }
})

//upload page view controller
app.get(`/upload`, async (req,res) => {
    try {
        return res.render('upload.ejs')
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status:false, msg: err})
    }
})

//api route
app.use(`/api/file`, require('./route/fileRoute'))

//api route
app.all(`**`, async (req,res) => {
    try {
        return res.status(StatusCodes.NOT_FOUND).json({ status:false, msg:`requested path not found.`})
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status:false, msg: err})
    }
})

//server listener
app.listen(PORT,() => {
   connectDb()
    console.log(`server is running @ http://localhost:${PORT}`)
})