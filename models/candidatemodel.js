const mongoose = require('mongoose')

const questionnaireSchema = new mongoose.Schema({
    question: {type: String},
    response: {type: String}
})

const referredBySchema = new mongoose.Schema({
    referrerId: {type: String, required: true},
    referrerEmail: {type: String},
    referrerName: {type: String}
})
const pipelineSchema = new mongoose.Schema({
        candidate_referred:{type: String,
            enum: ["In Progress","Successful"],
            default: "In Progress"
        },
        client_review:{type: String,
            enum: ["Yet to Start", "Rejected", "Successful", "In Progress"],
            default: "Yet to Start"
        },
        hr_review:{type: String,
            enum: ["Yet to Start", "Rejected", "Successful", "In Progress"],
            default: "Yet to Start"
        },
        interview_stage:{type: String,
            enum: ["Yet to Start", "Rejected", "Successful", "In Progress"],
            default: "Yet to Start"
        },
        offer_stage:{type: String,
            enum: ["Yet to Start", "Rejected", "Successful", "In Progress"],
            default: "Yet to Start"
        },
        reward_stage:{type: String,
            enum: ["Yet to Start", "Rejected", "Successful", "In Progress"],
            default: "Yet to Start"
        },
        reward_recieved:{type: String,
            enum: ["Yet to Start","Successful"],
            default: "Yet to Start"
        },
})
const candidateSchema = new mongoose.Schema({
    given_name: {type: String, required:true},
    surname: {type: String, required:true},
    email_address: {type: String, required:true},
    linkedin_url: {type: String, required:true},
    posting_id: {type: String, required:true},
    referred_by: referredBySchema,
    post_name: {type: String},
    post_organization: {type:String},
    pipeline: pipelineSchema,
    questionnaire: [questionnaireSchema],
    referred_on: {type: Date, default: Date.now()},
    resume: {type:String,required:true},
    joining_date: {type: Date},
    reward: {type:String},
    reward_status: {type:String, default: "N/A"}
})

const model = mongoose.model("CandidateModel",candidateSchema)

module.exports = model