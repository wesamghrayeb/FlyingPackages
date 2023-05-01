const {Courier} = require('../models/Courier');
const express = require('express');
const router = express.Router();



router.post('/', async (req,res)=>{

    let courier = new Courier({
        birthDate: req.body.birthDate,
        hoursPerMonth: req.body.hoursPerMonth,
        deliveriesPerMonth: req.body.deliveriesPerMonth,
        availablityStatus: req.body.availablityStatus,
        status: req.body.status,
        user: req.body.user,

    })
    courier = await courier.save();

    if(!courier)
    return res.status(400).send('the courier cannot be added!')

    res.send(courier);
})

router.get(`/`, async (req, res) =>{
    
    const courierList = await Courier.find()
    .populate({ path: 'location', model: 'Location' })
    .populate({ path: 'user', model: 'flyUser' });

    if(!courierList) {
        res.status(500).json({success: false})
    } 
    res.send(courierList);
})


module.exports = router;