const mongoose = require('mongoose')

const userquerySchema = new mongoose.Schema({
    userId: {type:String,required:true},
    userName: {type:String,required:true},
    userEmail: {type:String,required:true},
    userDoubt: {type:String},
    queriedOn: {type: Date, default:Date.now()},
    adminResponse: {type:String, default: "N/A"}
})

const model = mongoose.model("UserqueryModel",userquerySchema)

module.exports = model