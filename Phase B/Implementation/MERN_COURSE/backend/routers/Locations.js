
const {Location} = require('../models/Location');
const express = require('express');
//const { OrderItem } = require('../models/oreder-item');
const router = express.Router();



router.post('/', async (req,res)=>{


    let location = new Location({
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        name: req.body.name,
    })
    location = await location.save();

    if(!location)
    return res.status(400).send('the location cannot be added!')

    res.send(location);
})


module.exports = router;