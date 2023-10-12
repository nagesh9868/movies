const mongoogse = require('mongoose')

const userSchema = mongoogse.Schema({
    name:String,
    email:String,
    password:String
})

module.exports = mongoogse.model('users', userSchema)