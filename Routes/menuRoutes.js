//We have a lots of endpoints in a single file (cresting_server.js)

//bad experience in code readibility as well as code handling
//we place all code with same end point here in one file and import it in main file(creating_server.js)
//and manager ROUTE HANDLING
//express js provides feature of router 

const express = require('express')
const router = express.Router()//As the constant router is placed here, we use it everywhere where we used to use app.get/post

const Menu = require('../Models/Menu')


//copying post method and placing here from creating server.js
router.post('/', async(req,res)=>{
    try {
        const data = req.body
        const newHotelMenu = new Menu(data)
        const HotelMenuResponse = await newHotelMenu.save()
        console.log("hotel menu records are saved here",HotelMenuResponse);
        res.status(200).json(HotelMenuResponse) 
    } catch (error) {
        res.status(500).json(error)
        console.log({error:"error here while loading up the files"});
    }
})


//copying get method and placing here from creating server.js
router.get('/', async(req,res)=>{
    try {
        const getHotelData = await Menu.find()
        console.log("Menu data items are here",getHotelData);
        res.status(200).json(getHotelData)
    } catch (error) {
        console.log({error:"failed to GET data of menu items here"});
        res.status(500).json(error)
    }
})

router.get('/:taste',async (req,res)=>{
    try {
        const taste = req.params.workType;

        if(taste == 'sweet'|| taste == 'sour' || taste =='spicy')
        {
            const response = await Menu.find({taste:taste})
            res.status(200).json(response)
            console.log("here is the taste of your food",response);
        }
        else{
            res.status(404).json({error:"Not a Tasty food"})
        }
        
    } catch (error) {
        res.status(500).json(error)
    }
})



router.put('/:id', async (req,res)=>{
    try {
        const menuId = req.params.id
        const menuUpdateItem = req.body
        
        const menuResponse = await Menu.findByIdAndUpdate(menuId,menuUpdateItem,{
            new:true,
            runValidators:true,
        })
        if(menuUpdateItem==null){
            res.status(404).json(menuResponse)
        }
        console.log(menuResponse);
        res.status(200).json(menuResponse)
        
    } 
    catch (error) {
        console.log(menuResponse);
        res.status(500).json(error)
    }
})

router.delete('/:id', async(req,res)=>{
    try {
        const menuId = req.params.id
        const menuDeleteItems = req.body
        //we can use findByIdAndRemove by just passing the id into it
        const Todelete = await Menu.findByIdAndDelete(menuId,menuDeleteItems,{
            new:true,
            runValidators:true,
        })

        if(menuDeleteItems == null){
            res.status(404).json(error)
        }
        res.status(200).json(Todelete)
        console.log(Todelete);
        
    } catch (error) {
        res.status(500).json(error)
        console.log(Todelete);
    }});

//comment added for testing purpose

module.exports = router