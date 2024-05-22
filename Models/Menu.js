const mongoose = require('mongoose')
//mongoose is imported as we create schema using this only

const menuItemsSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    taste:{
        type:String,
        enum:["sweet","sour","spicy"],
        require:true
    },
    is_Drink:{
        type:Boolean,
        require:true
    },
    ingredients:{
        type:[String],
        default:false
    },
    num_Sales:{
        type:Number,
        require:true
    },
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }

})

const Hotelmenu = mongoose.model('Menu',menuItemsSchema)
module.exports = Hotelmenu