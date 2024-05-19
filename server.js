// console.log("server file is running");

// function add(a,b){
//     return a+b;
// }


// var add = function(a,b){
//     return a+b;
// }

//arrow function

// var add =(a,b) =>{
//     return a+b
// }


// var add= (a,b)=> a+b
// var result = add(2,7)

// console.log(result);


// (function(){
//     console.log("yash");
// })()

//call back function

//callback is a function
//the function which is being called is callback function

// function callback(){
//     console.log("callback function is being executed");//callback function here
// }

// const add = function(a,b,callback){//main function here
//     var result = a+b;
//     console.log(result);
//     callback()
// }

// add(3,4,callback)//chercked, even we skip parameter of callback; it gets executed


//second way for callback function

// const add = function(a,b,callback){//main function here
//         var result = a+b;
//         console.log(result);
//         callback()
//     }

// add(3,8,callback = ()=>{console.log("In line function");})

//CORE MODULES IN JS

var fs = require('fs')
var os = require('os')

var user = os.userInfo();
console.log(user);
console.log(user.username);

fs.appendFile('greeting.txt','HI '+user.username+'_!\n',()=>{console.log("file created");})

console.log(os);
console.log(fs);



//Importing files in Nodejs

const notes = require ('./notes.JS')

//lodash package

var _ = require('lodash');//there is a convention in JS to represent lodash with underscore

var age = notes.age

var result = notes.addNumber(age+18,10)


console.log("notes page is loaded2");
console.log(age);
console.log(result);

var data = ["person","person",1,2,11,223,"name","age",'2']

var filter = _.uniq(data)//uniq is present within lodash, we used this to find unique elementsin an array

console.log(filter);

console.log(_.isString("yash"));//isString is another propety present within lodash
