const mongoose=require("mongoose")
const bcrypt =require("bcrypt")
const userSchema = new mongoose.Schema({
    firstName :{type : String , required:true},
    lastName :{type:String},
    userName :{type:String},
    email:{type:String,required:true ,unique: true},
    password: {type:String},
    age :{type:Number},
    country:{type:String},
    phoneNumber :{type:String},
    gender :{type:String},
    image:{type:String}
})


userSchema.pre("save",async function(){
this.email=this.email.toLowerCase();
this.password= await bcrypt.hash(this.password,8)
})

const model = new mongoose.model("User",userSchema)

module.exports=model