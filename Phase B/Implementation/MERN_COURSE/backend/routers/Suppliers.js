const {Supplier} = require('../models/Supplier');
const express = require('express');
const router = express.Router();

/**
 * get the supplier by the userId
 */
router.get('/get/:id', async (req, res) =>{
    const supplier = await Supplier.find({'user' : req.params.id})
    .populate({ path: 'location', model: 'Location' })
    .populate({ path: 'user', model: 'flyUser' });
    if(!supplier) {
        res.status(500).json({success: false})
    } 
    res.send(supplier);
})

/**
 * add a new supplier
 */
router.post('/', async (req,res)=>{

    let supplier = new Supplier({
        status: req.body.status,
        ordersNo: req.body.ordersNo,
        registirationDate: req.body.registirationDate,
        companyName: req.body.companyName,
        user: req.body.user,

    })
    supplier = await supplier.save();

    if(!supplier)
    return res.status(400).send('the supplier cannot be added!')

    res.send(supplier);
})


module.exports = router;