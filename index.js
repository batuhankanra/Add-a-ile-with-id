import express from 'express'
import path from 'path'
import {fileURLToPath} from 'url'
import multer from 'multer'
import fs from 'fs'


const app= express()
const filename=fileURLToPath(import.meta.url)
const dirname=path.dirname(filename)


 

const uploadDir=path.join(dirname,'uploads')
if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir)
}
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        const userDir=path.join(uploadDir,req.body.id)
        if(!fs.existsSync(userDir)){
            fs.mkdirSync(userDir)
        }
        cb(null,userDir)
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const uploads=multer({
    storage
})


app.get('/upload',uploads.single('file'),(req,res)=>{
    console.log(req.body.id)
    if(!req.file){
        return res.status(404).json({msg:'There is no file'})
    }
    if(!req.body.id){
        return res.status(404).json({msg:'There is no id'})
    }
    return res.status(200).json({msg:'file uploads complated'})
})





app.listen(3000,()=>{
    console.log('the server is running on port  3000')
})