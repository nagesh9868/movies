const mongoogse = require('mongoose')

const debCandidateSchema = mongoogse.Schema({
    name:String,
    father:String,
    mother:String,
    dob:String,
    gender:String,
    category:String,
    educationboard:String,
    rollnumber:String,
    examname:String,
    examyear:String,
    examrollno:String,
    debbardfrom:String,
    debbardupto:String,
    filename:String
})

module.exports = mongoogse.model('candidates', debCandidateSchema)