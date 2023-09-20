const mongoose=require("mongoose")

const memberschema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    memberid:{
        type:String,
        required:true
    },
    userimage:{
          type:String,
        required:true
    },
    is_admin:{
        type:String,
        default:0
    }
},{timestamps:true})

module.exports=new mongoose.model("memberinfo",memberschema)