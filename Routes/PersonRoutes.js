//We have a lots of endpoints in a single file (cresting_server.js)

//bad experience in code readibility as well as code handling
//we place all code with same end point here in one file and import it in main file(creating_server.js)
//and manager ROUTE HANDLING
//express js provides feature of router 

const express = require('express')

const router = express.Router()//As the constant router is placed here, we use it everywhere where we used to use app.get/post

const Person = require('./../Models/Person')

const {jwtAuthMiddleware,generateToken}= require('./../jwt')


//copying post method and placing here from creating server.js
router.post('/signup',async(req,res)=>{
    try{
      const data = req.body
  
      const newPerson = new Person(data)
    
      const response = await newPerson.save()
      console.log("data saved here in Response",response);

      const payload = {
        id:response.id,
        username:response.username
      }

      console.log(JSON.stringify(payload));

      const token = generateToken(payload)
      console.log("token is :",token);
  
      // res.status.json(200)(response)
      res.status(200).json({response:response,token:token})
  
    }
    catch(err){
      console.log(err);
      res.status(500).json({err:"errorrrr"})
    }
  })

  //LOGIN ROUTES
  router.post('/login',async (req,res)=>{
    try {
      //extract username and password
      const {username,password} = req.body
      //checking for the existing username in our database
      const user = await Person.findOne({username:username})

      //if user does not exist or passsword does not match; return error here
      if(!user || !(await user.comparePassword(password))){
        return res.status(404).json({error:"invalid username and password"})
      }
      //now generating token here as the above condition does not stand
      //generating token now; we generate tokens by using payloads

      const payload = {
        id : user.id,
        username : user.username
      }
      const token = generateToken(payload)

      //finally, returning token as response here

      res.json({token:token})
      console.log(token);

      
    } catch (error) {
      res.status(500).json({error:"Internal error as token generation failed"})
      console.log(error);

      
    }

  })



  //creating a Profile routes here
  router.get('/profile',jwtAuthMiddleware, async(req,res)=>{
    try {
      const userData = req.user;
      console.log("userData is ",userData);


      const userId = userData.id;//finding data of person using its unique id

      const user = await Person.findById(userId)
      res.status(200).json(user)

      
    } catch (error) {
      res.status(500).json({error:"internal server error"})
      console.log(error);
      
    }
  })


//copying get method and placing here from creating server.js

  router.get('/',jwtAuthMiddleware,async(req,res)=>{
    try {
      const getData = await Person.find()
      console.log("DATA is displayed here!",getData);
      res.status(200).json(getData)
      
    } catch (err) {
      console.log("errror while fetching data from the Person file",err);
      res.status(500).json({err:"error, therefore we are in catch block now"})
  
    }
  })

//copying get method(parametrised URL) and placing here from creating server.js

  router.get('/:workType',async (req,res)=>{
    try {
      const workType = req.params.workType;//extract the work type from the URL parameter
  
      if(workType == 'chef' ||workType == 'manager' ||workType == 'waiter'){
        
        const response = await Person.find({work: workType})
  
        res.status(200).json(response)
        console.log("WorkType is defined",response);
        
      }
      else{
        res.status(404).json({error:"error as the work Type is invalid"})
      }
      
    } 
    catch (err) {
      console.error(err);
      res.status(500).json({error:"error, therefore here in error block"})
      
    }
  })

//updating here using PUT Method
//using unique ID to get thar particular data
  router.put('/:id',async (req,res)=>{
    try {
        const personId = req.params.id//this extracts the id from the URL Parameter
        const updatedPersonData = req.body

        //findByIdAndUpdate, this finds the particular record using the id and updates it
        const response = await Person.findByIdAndUpdate(personId, updatedPersonData,{
            new:true,//return the updated document;
            runValidators:true,//Run Mongoose validation
        })
        if(updatedPersonData == null){
            res.status(404).json(response)
        }
        console.log("data updated",response);
        res.status(200).json(response)
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
  })

  //Deleting here using DELETE Method

  router.delete('/:id',async (req,res)=>{
    try {
        const personId = req.params.id
        const deletePersonData = req.body

        const toDeleteResponse = await Person.findByIdAndDelete(personId,deletePersonData,{
            new:true,
            runValidators:true,
        })
        if(deletePersonData == null){
            res.status(404).json(deletePersonData)
        }
        console.log("record with unique ID is now deleted",toDeleteResponse);
        res.status(200).json(toDeleteResponse) 
    } catch (error) {
        res.status(500).json(error)
        console.log({error:"error while deleting the record"});       
    }
  })

  module.exports = router