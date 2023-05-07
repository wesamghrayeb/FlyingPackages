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

/**
 * get the courier by the userId
 */
router.get('/get/:id', async (req, res) =>{
    const supplier = await Courier.find({'user' : req.params.id})
    .populate({ path: 'location', model: 'Location' })
    .populate({ path: 'user', model: 'flyUser' });
    if(!supplier) {
        res.status(500).json({success: false})
    } 
    res.send(supplier);
})

router.put("/updateStatus/:id", async (req, res) => {
    const courier = await Courier.findByIdAndUpdate(
      req.params.id,
      {
        availablityStatus: req.body.availablityStatus,
      },
      { new: true }
    );
  
    if (!courier) return res.status(404).send("the Availability status of the courier cannot be updated");
  
    res.send(courier);
  });


module.exports = router;