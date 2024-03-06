const { StatusCodes } = require('http-status-codes')
const File = require('../model/file')
const fs = require('fs')
//upload
const uploadFile = async (req,res) => {
    try {
        //to read  file data ->req.file
        let data = req.file

             //to validate file already exists or not
        let extFile = await File.findOne({ originalname:data.originalname})
        if(extFile)
            return res.status(StatusCodes.CONFLICT).json({status:false, msg: `file already exists.`})
        
        //file data upload to db
        let newFile = await File.create(data)
        res.status(StatusCodes.CREATED).json({status:true, msg:'file uploaded', file: newFile })
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status:false, msg: err})
    }
}
//read all files
const readAllFiles = async (req,res) => {
    try {
        let data = await File.find({})
         //final response
        res.status(StatusCodes.ACCEPTED).json({ status: true, length: data.length, files: data})
    } catch (err) {
        //logical error
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status:false, msg: err})
    }
}
//read single file
const readSingleFile = async (req,res) => {
    try {
        //reading fileid from router parameters
        let id = req.params.id
        //file is exists in db or not
        let extFile = await File.findById(id)
        //if filenot exists -> throw err
        if(!extFile)
        return res.status(StatusCodes.NOT_FOUND).json({status:false, msg: `requested id not found`})
         //final response
        res.status(StatusCodes.ACCEPTED).json({ status:true, file: extFile })
    } catch (err) {
        //logical error
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status:false, msg: err})
    }
}
//delete file
const deleteFile = async (req,res) => {
    try {
        //reading fileid from router parameters
        let id = req.params.id
        //file is exists in db or not
        let extFile = await File.findById(id)
        //if filenot exists -> throw err
         if(!extFile)
        return res.status(StatusCodes.NOT_FOUND).json({status:false, msg: `requested id not found`})
       
        fs.unlinkSync(extFile.path)/*delete file from location*/
         //delete db contents
        await File.findByIdAndDelete(id)
         //final response
       return res.status(StatusCodes.ACCEPTED).json({ status:true, msg: 'File deleted successfully'})
    } catch (err) {
        //logical error
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status:false, msg: err})
    }
}

module.exports = { uploadFile, readAllFiles,readSingleFile, deleteFile }