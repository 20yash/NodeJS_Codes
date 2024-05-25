const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./Models/Person');

passport.use(new LocalStrategy(async (username,password,done)=>{
    try {
        // console.log('received credentials',USERNAME,password);
        const user =await  Person.findOne({username})

        if(user === null){
            return done(null, false,{message:'user not found in our records,INCORRECT USERNAME!'})
        }
        // const isPasswordMatch = user.password === password ? true:false;//we have to change this as we are now using hashed password
        const isPasswordMatch =await user.comparePassword(password)
        if(isPasswordMatch === true){
            return done(null,user)
        }
        else
        return done(null,false,{message:"PASSWORD IS INCORRECT"})
    } catch (error) {
        return done(error)
    }
}))


module.exports = passport