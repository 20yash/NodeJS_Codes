const express = require('express')
const app = express();//app is instance of Express(blueprint or map)
//app has all the functionalities to use to create server

const db = require('./db')

const bodyParser = require('body-parser');
app.use(bodyParser.json())//stored in req.body here
//bodyparser.json() automatically parses the JSON data from the request body->converts into JS Object and ->stores in req.body


const Menu = require('./Models/Menu')//using Menu model here to perform certain operations on database
const Person = require('./Models/Person')//using person model here to perform certain operations on database



const personRouter =require('./Routes/PersonRoutes')
app.use('/person',personRouter)



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


app.listen(3001,()=>
{
    console.log("server is running on port 3001");
})//3000 is port here