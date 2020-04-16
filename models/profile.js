const mongoose = require('mongoose')
const Schema = mongoose.Schema

// creating the profile schema
const profileSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },
    handle:{
        type:String,
        required:true,
        max:40
    },
    company:{
        type:String,
        required:false
    },
    website:{
        type:String,
    },
    location:{
        type:String,
    },
    status:{
        type:String,
        required:true
    },
    skills:{
        type:[String],
        required:true
    },
    bio:{
        type:String
    },
    githubusername:{
        type:String,
        required:false
    },
    experience:[
        {
            title:{
               type: String,
                required:true
            },
            company: {
                type: String,
                required: true
            }, 
            location: {
                type: String,
                required: false
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: String,
                required: true
            },
            current: {
                type: Boolean,
                default:false
            },
            description: {
                type: String,
                required: false
            },

        }
    ],
    education: [
        {
            school: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            fieldofstudy: {
                type: String,
                required: false
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: String,
                required: true
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String,
                required: false
            },

        }
    ],
    social:{
        youtube:{
            type:String
        },
        twitter: {
            type: String
        },
        instagram: {
            type: String
        },
        linkedin: {
            type: String
        },
        facebook: {
            type: String
        }
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

const Profile = mongoose.model('profile', profileSchema)
module.exports = Profile