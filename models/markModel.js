const mongoose=require('mongoose')
const userSchema= new mongoose.Schema({
    courseId:String,
    mark:Boolean,
    date:String
})

module.exports=mongoose.model('tblMark',userSchema)