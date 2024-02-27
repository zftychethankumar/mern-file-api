const { StatusCodes } = require('http-status-codes')
//upload
const uploadFile = async (req,res) => {
    try {
        res.status(StatusCodes.CREATED).json({ msg: "upload file"})
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status:false, msg: err})
    }
}
//read all files
const readAllFiles = async (req,res) => {
    try {
        res.status(StatusCodes.ACCEPTED).json({ msg: "read all files"})
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status:false, msg: err})
    }
}
//read single file
const readSingleFile = async (req,res) => {
    try {
        res.status(StatusCodes.ACCEPTED).json({ msg: "read single file"})
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status:false, msg: err})
    }
}
//delete file
const deleteFile = async (req,res) => {
    try {
        res.status(StatusCodes.ACCEPTED).json({ msg: "delete file"})
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status:false, msg: err})
    }
}

module.exports = { uploadFile, readAllFiles,readSingleFile, deleteFile }