const express = require('express')
const mongoose = require('mongoose')
mongoose.set('strictQuery',true)
const cors = require('cors')
require('dotenv').config()


const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.DB_URL)
        console.log(`MongoDB connected: ${conn.connection.host}`)
        
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}


const Posting = require('./models/postingsmodel')
const User = require('./models/usermodel')
const Candidate = require('./models/candidatemodel')
const Userquery = require('./models/userquerymodel')

const app = express()

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Server is up and running")
})

app.post("/admin/postings",async(req,res)=>{
    try{
        let record = req.body
        const response = await Posting.create(record)
        console.log(response._id)
        res.status(200)
        res.json(response)
    }
    catch(err){
        console.log(err)
        res.json({status:404})
    }
})
app.get("/postings",async(req,res)=>{
    Posting.find({},(err,result)=>{
        if(err){
            console.log(err)
            res.status(404)
        }
        else{
            res.json(result)
            res.status(200)
        }
    })
})

app.get("/postings/:postingid",async(req,res)=>{
    try {
        const {postingid} = req.params
        const response = await Posting.findById(postingid)
        res.status(200)
        res.json(response)
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
})

app.get("/admin/users",async(req,res)=>{
    try {
        const result = await User.find({})
        res.json(result)
        res.status(200)
    } catch (error) {
        console.log(error)
        res.status(404)
    }
})
app.delete("/admin/postings/:postingid",async(req,res)=>{
    try {
        let {postingid} = req.params
        const result = await Posting.deleteOne({_id: postingid})
        res.status(200)
        res.json(result)
        console.log(result)
    } catch (error) {
        console.log(error)
        res.status(404)
    }
})

app.put("/admin/postings/updatefield",async(req,res)=>{
    try {
        let {postingid,postingkey,postingvalue} = req.body
        const result = await Posting.updateOne({_id:postingid},{$set:{[postingkey]:postingvalue}})
        res.json(result)
        res.status(200)
    } catch (error) {
        console.log(error)
        res.status(404)
    }
})

app.put("/admin/postings/updatejd",async(req,res)=>{
    try {
        let {postingid,jd} = req.body
        const result = await Posting.updateOne({_id:postingid},{$set:{job_description:jd}})
        res.json(result)
        res.status(200)
    } catch (error) {
        console.log(error)
        res.status(404)
    }
})
app.post("/saveuser",async(req,res)=>{
    try {
        let {userid,posting} = req.body
        const response = await Posting.updateOne({_id: posting},{$addToSet: {saved_users: userid}}) 
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.json({status:404})
    }
})
app.put("/removesave",async(req,res)=>{
    try {
        let {userid,posting} = req.body
        const response = await Posting.updateOne({_id: posting},{$pull:{saved_users: userid}})
        res.json(response)
        res.status(200)        
    } catch (error) {
        console.log(error)
        res.status(404)
    }
})
app.get("/userdetails/:userid",async(req,res)=>{
    try {
        let {userid} = req.params
        const result = await User.find({_id: userid})
        res.json(result)
        res.status(200)
    } catch (error) {
        console.log(error)
        res.json({status:404})
    }
})

app.post("/referral",async(req,res)=>{
    try{
        let record = req.body
        const result = await Candidate.create(record)
        console.log(result._id)
        res.status(200).json(result)
    }
    catch(error){
        console.log(error)
        res.json({status:404})
    }
})

app.get("/referral/:userid",async(req,res)=>{
    try {
        let {userid} = req.params
        const result = await Candidate.find({referrer_id: userid})
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(404)
    }
})

app.put("/candidatestatus/:candidateid",async(req,res)=>{
    try{
        let {candidateid} = req.params
        const result = await Candidate.updateOne({_id:candidateid},{$set:{pipeline: req.body}})
        res.status(200).json(result)
    }
    catch(error){
        console.log(error)
        res.status(404)
    }
})

app.get("/candidates",async(req,res)=>{
    Candidate.find({},(err,result)=>{
        if(err){
            console.log(err)
            res.status(404)
        }
        else{
            res.json(result)
            res.status(200)
        }
    })
})

app.delete("/candidates/:candidateid",async(req,res)=>{
    try {
        let {candidateid} = req.params
        const result = await Candidate.deleteOne({_id: candidateid})
        res.status(200)
        res.json(result)

    } catch (error) {
        console.log(error)
        res.status(404)
    }
})

app.put("/admin/candidate/updatefield",async(req,res)=>{
    try {
        let {candidateid,candidatekey,candidatevalue} = req.body
        const result = await Candidate.updateOne({_id:candidateid},{$set:{[candidatekey]:candidatevalue}})
        res.json(result)
        res.status(200)
    } catch (error) {
        console.log(error)
        res.status(404)
    }
})

app.post("/user/query",async(req,res)=>{
    try {
        let record = req.body
        const result = await Userquery.create(record)
        res.json(result)
        res.status(200)
    } catch (error) {
        console.log(error)
        res.status(404)
    }
})

app.put("/admin/query",async(req,res)=>{
    try {
        let {queryid,adminresponse} = req.body
        const result = await Userquery.updateOne({_id: queryid},{$set:{adminResponse: adminresponse}})
        res.json(result)
        res.status(200)
    } catch (error) {
        console.log(error)
        res.status(404)
    }
})

app.get("/admin/query",async(req,res)=>{
    try {
        const result = await Userquery.find({})
        res.status(200)
        res.json(result)
    } catch (error) {
        console.log(error)
        res.status(404)
    }
})

app.delete("/admin/query/:queryid",async(req,res)=>{
    try {
        let {queryid} = req.params
        const result = await Userquery.deleteOne({_id: queryid})
        res.status(200)
        res.json(result)

    } catch (error) {
        console.log(error)
        res.status(404)
    }
})

connectDB().then(()=>{
    app.listen(process.env.PORT || 4000,()=>{
        console.log(`Server is running on ${process.env.PORT}`)
    })
})
