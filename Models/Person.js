const mongoose = require('mongoose')

//Defining the person Schema here now

const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true//required is mentioned here as the name cannot be blank
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:["chef","waiter","manager"],//checking whether the work designation is from array or not
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    }


})

//create person model

const Person = mongoose.model('Person',personSchema)

module.exports = Person
