//converting JSON to Object here

const jsonString = '{"name":"shivanshu","age":25,"city":"Kanpur"}';
const jsonObject = JSON.parse(jsonString)
console.log(jsonObject);

console.log(typeof(jsonObject));


//converting Object to JSON here

const Object1 = {
                    name:"shivanshu",
                    age:25,
                    city:"Kanpur"
                };
const ObjectJSON = JSON.stringify(Object1)
console.log(ObjectJSON);

console.log(typeof(ObjectJSON));