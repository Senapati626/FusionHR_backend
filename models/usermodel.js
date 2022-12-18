const mongoose = require('mongoose');

const referralsSchema = new mongoose.Schema({
    postingId: {type: String},
    candidateId: {type: String},
    queried_on: {type: Date, default: Date.now()}
})



const userSchema = new mongoose.Schema({
    fullName: {type:String, required:true},
    emailAddress: {type:String, required: true, unique: true},
    password: {type:String, required:true},
    saved: {type:[String]},
    referrals: [referralsSchema]
})

const model = mongoose.model('User',userSchema)

module.exports = model