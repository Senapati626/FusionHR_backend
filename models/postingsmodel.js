const mongoose = require('mongoose')

const DescriptionSchema = new mongoose.Schema({
        experience_level: {type: String, default: "N/A"},
        experience_reqd: {type:String, default: "N/A"},
        education_level: {type:String, required:true},
        job_function: {type:String, default: "N/A"},
        industry: {type:String, default:"N/A"},
        description: {type: [String], required: true},
        responsiblities: {type:[String],required:true}
})
const PostingSchema = new mongoose.Schema({
        post_name: {type: String, required: true},
        organization: {type: String, required: true},
        location: {type: String, required: true},
        employment: {
            type: String,
            enum: ["Direct Hire","Contract"]
        },
        skills: {type:[String],required:true},
        job_description: DescriptionSchema,
        job_insights: {type: [String]},
        screening_questions: {type:[String], default:"N/A"},
        referral_reward: {type:Number, required:true},
        guarantee_period: {type: Number, required: true},
        saved_users: {type: [String]},
        status: {type: String, default:"open"}
    }
)

const model = mongoose.model("PostingModel",PostingSchema)

module.exports = model
