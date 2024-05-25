const express = require('express')
const app = express();//app is instance of Express(blueprint or map)
//app has all the functionalities to use to create server

const passport = require('./auth')

// const passport = require('passport')
// const LocalStrategy = require('passport-local').Strategy;//passport local strategy is part of passport.js authentication middleware
// //it is designed to handle username and password based authentication
// // const Person = require('./Models/Person');


// passport.use(new LocalStrategy(async (USERNAME,password,done)=>{
//     //authentication logic here
//     try {
//         console.log('received credentials',USERNAME,password);
//         const user =await  Person.findOne({username:USERNAME})

//         if(user === null){
//             return done(null, false,{message:'user not found in our records,INCORRECT USERNAME!'})
//         }
//         const isPasswordMatch = user.password === password ? true:false;
//         if(isPasswordMatch === true){
//             return done(null,user)
//         }
//         else
//         return done(NULL,false,{message:"PASSWORD IS INCORRECT"})
//     } catch (error) {
//         return done(error)
//     }
// }))



app.use(passport.initialize())

const localAuthMiddleware = passport.authenticate('local',{session:false})

app.get('/', (req, res)=> {
    res.send('Hello World')
    console.log("hello world");
   })// implemented middleware on '/' end point
  


//Middleware function here



//middleware is like the behind the scene process;
//series of function that our request goes through before reaching the final destination
const logRequest = (req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}]request made to: ${req.originalUrl}`);
    next();//move on to the next phase; if next() is not mentioned here then it will not go onto next step
    //in express.js ,the next function is callback that signals to Express that the current middleware function has completed
    //and its time to move on to the next middleware function or route handler in the chain
}

app.use(logRequest)//using middleware everywhere by simply using app.use





const db = require('./db')

const bodyParser = require('body-parser');
app.use(bodyParser.json())//stored in req.body here
//bodyparser.json() automatically parses the JSON data from the request body->converts into JS Object and ->stores in req.body

require('dotenv').config()
const PORT = process.env.PORT || 3001;




const Menu = require('./Models/Menu')//using Menu model here to perform certain operations on database
const Person = require('./Models/Person')//using person model here to perform certain operations on database



const personRouter =require('./Routes/PersonRoutes')
app.use('/person',localAuthMiddleware,personRouter)



const menuRouter = require('./Routes/menuRoutes')
app.use('/menu',menuRouter)



//using get here to getting the information from the server
// we have function here,it has two parameters;one is request and other is response


//whenever we select '/', we get a response hello world


// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

// //second get Request sent with name menu


// app.get('/menu?', function (req, res) {
//   res.send('Hi, welcome to our place, here is the menu!')
// })

// //third get request sent with name Dinner


// app.get('/Dinner', function (req, res) {
//   res.send('Dinner is served')
// })

// //fourth get request sent with name breakfast


// app.get('/breakfast', function (req, res){
//     var coustomised = {
//         name:"Ravi",
//         size:10,
//         is_Available:true,
//         additionals:false
//     }
//   res.send(coustomised)
// })

// app.post('/items',function(req,res){
//   console.log("data is saved here");
  
// })


//POST route to add a person

//nobody uses Callback function in JS as it makes code readibility difficult
//callback example here

// app.post('/person',(req,res)=>{
//   const data = req.body//assuming the request body contains the person data


//   //create a new person document using the Mongoose model
//   const newPerson = new Person(data)

//   //we can directly pass data in new Person(data)
//   //OR
//   // we can do this individually 
  
//   // newPerson.name = data.name
//   // newPerson.age = data.age
//   // newPerson.work = data.work
//   // newPerson.mobile = data.mobile
//   // newPerson.email = data.email
//   // newPerson.address = data.address
//   // newPerson.salary = data.salary


//   newPerson.save((error,savedPerson)=>{
//     if(error){
//       console.log("error while saving person's data",error);
//       res.status.json(500)({error:"Error as we are the data is not fetched from the person.js"})
//       //status code is 500 because it is a error
//       //for more info, refer MDN Docs
//     }
//     else{
//       console.log("Data saved successfully");
//       // res.status.json(200)({success:"SUCCESS, hurray!"})

//       res.status.json(200)(savedPerson)
//       //Status code is 200 because it is passed OK
//     }
//   })

  
// })

//Instead we use TRY and Catch, a good industry level practice
//TRY and CATCH explaination here

// Moving entire post method for endpoint person into PersonRouters.js
// app.post('/person',async(req,res)=>{
//   try{
//     const data = req.body

//     const newPerson = new Person(data)
  
//     const response = await newPerson.save()
//     console.log("data saved here in Response",response);

//     // res.status.json(200)(response)
//     res.status(200).json(response)

//   }
//   catch(err){
//     console.log(err);
//     res.status(500).json({err:"errorrrr"})
//   }
// })

//Creating a Request in which we get enitre data of PERSON
//GET Method 

// Moving entire get method for endpoint person into PersonRouters.js

// app.get('/person',async(req,res)=>{
//   try {
//     const getData = await Person.find()
//     console.log("DATA is displayed here!",getData);
//     res.status(200).json(getData)
    
//   } catch (err) {
//     console.log("errror while fetching data from the Person file",err);
//     res.status(500).json({err:"error, therefore we are in catch block now"})

//   }
// })

//parametirised URL;adding parameter to the URL

// Moving entire get method for endpoint person into PersonRouters.js


// app.get('/person/:workType',async (req,res)=>{
//   try {
//     const workType = req.params.workType;//extract the work type from the URL parameter

//     if(workType == 'chef' ||workType == 'manager' ||workType == 'waiter'){
      
//       const response = await Person.find({work: workType})

//       res.status(200).json(response)
//       console.log("WorkType is defined",response);
      
//     }
//     else{
//       res.status(404).json({error:"error as the work Type is invalid"})
//     }
    
//   } 
//   catch (err) {
//     console.error(err);
//     res.status(500).json({error:"error, therefore here in error block"})
    
//   }
// })

//++++++++++++++++++++++++


//NOW CREATING POST AND GET REQUEST FOR MENU.JS

// Moving entire post method for endpoint menu into menuRoutes.js

//POST method
// app.post('/menu',async(req,res)=>{
//   try{
//     const data = req.body

//     const newHotelMenu = new Menu(data)

//     const HotelmenuResponse = await newHotelMenu.save()
//     console.log("Hotel Menu data is saved in response",HotelmenuResponse);
//     res.status(200).json(HotelmenuResponse)

//   }catch(err){
//     console.log(err);
//     res.status(500).json({error:"error here for the HotelMenu"})
//   }
// })

//GET method, getting the entire data

// Moving entire get method for endpoint menu into menuRoutes.js

// app.get('/menu', async(req,res)=>{
//   try{
//     const getHotelData = await Menu.find()
//     console.log("MENU DATA IS HERE",getHotelData);
//     res.status(200).json(getHotelData)
//   }
//   catch(err){
//     console.log(err);
//     res.status(500).json({error:"error, therefore here in error block"})

//   }
// })


//here is the link to MONGODB ATLAS
//https://cloud.mongodb.com/v2/664b0a145404bf08a382276a#/clusters

//here is the link to render
//https://dashboard.render.com/web/srv-cp5jte21hbls73fgofk0/deploys/dep-cp5jte21hbls73fgofpg

app.listen(PORT,()=>
{
    console.log("server is running on port 3001");
})//3000 is port here