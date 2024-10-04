const mongoose=require("mongoose")
const bcrypt =require("bcrypt")
const userSchema = new mongoose.Schema({
    firstName :{type : String , required:true},
    lastName :{type:String,required:true},
    userName :{type:String,required:true},
    email:{type:String,required:true ,unique: true},
    password: {type:String,required:true},
    age :{type:Number,required:true},
    country:{type:String},
    gender :{type:String},
    phoneNumber :{type:String},
})


userSchema.pre("save",async function(){
this.email=this.email.toLowerCase();
this.password= await bcrypt.hash(this.password,8)
})

const model = new mongoose.model("User",userSchema)

module.exports=model