const mongoose = require('mongoose')

const bcrypt = require('bcrypt')

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
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }


})

personSchema.pre('save',async function(next){
    const person = this
    //HASH the password only if it has been modified(or is new record)
    if(!person.isModified('password')) return next()
    try {
        //hash password generate
        // const salt = 'this is a salt'//we also give this but it might cause security issue
        const salt = await bcrypt.genSalt(10)//10 here is the digit we can add for the length of the salt

        //hash password here
        const hashedPassword = await bcrypt.hash(person.password,salt)
        //over writing the plain password with the hashed password here
        person.password = hashedPassword
        next()  
    }
    catch(error){
        return next(error)
    }

})

personSchema.methods.comparePassword = async function (candidatePassword){
    try {
        const isMatch = await bcrypt.compare(candidatePassword,this.password)
        return isMatch
    } catch (error) {
        throw error
        
    }
}

//create person model

const Person = mongoose.model('Person',personSchema)

module.exports = Person
