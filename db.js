const mongoose = require('mongoose')

require('dotenv').config()


//define the mongoDB connection URL

// const mongoURL= 'mongodb://localhost:27017/hotels'//Replace 'mydatabase' with your database name in URL
const mongoURL= process.env.mongoURL_LOCAL

// const mongoURL_LOCAL= process.env.MONGODB_URL_LOCAL//HIDING THE LOCAL URL AS WELL  in .env file


//the above URL at line 8 and 9 used to connect with local database


//SENSITIVE LINK HERE+++++++++
// const mongoURL= 'mongodb+srv://Yash20:Qwerty12345@yash20.axfd0jr.mongodb.net/'
//SENSITIVE LINK HERE+++++++++

//ACTUAL WAY TO DEAL WITH SENSITIVE LINK

// const mongoURL = process.env.MONGODB_URL

//URL at line 23 is used to connect to mongoDB server online not local

//MongoDB atlas provides a free cluister for users where you can host your db for free
//we just need to replave the link on line 5 with the link from the MongoDB atlas
//this URL at line no.10 used to connect with online Database cluster at MongoDB atlas


//DOTENV Modules, it is used to manage configuration variables and sensitive info in the application,
// eg:password,username,API Key separate from the main code
//here we have our atlas username and password here to keep it safe,using DOTENV



//now setting up MongoDB connection
//mongoose.connect() establishes the connection

//also passing two paramenters along with MongoURL here, useNewUrlParser and useUnifiedTopology

mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db = mongoose.connection;

//define event listner for database connection

db.on('connected',()=>{
    console.log("connected to MongoDB server");
})


db.on('error',(err)=>{
    console.error("error while connecting to MongoDB server",err);
})


db.on('disconnected',()=>{
    console.log("disconnected from MongoDB server");
})

//Now exporting the database connection

module.exports=db;