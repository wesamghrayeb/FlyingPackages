const {Bill} = require('../models/Bill');
const express = require('express');
const router = express.Router();

/**
 * get the bill by the supplierId
 */
router.get('/get/:id/:month', async (req, res) =>{
    const bill = await Bill.find({'supplier' : req.params.id}).find({'month' : req.params.month})
    if(!bill) {
        res.status(500).json({success: false})
    } 
    res.send(bill);
})

/**
 * add a new bill
 */
router.post('/', async (req,res)=>{

    let bill = new Bill({
        supplier: req.body.supplier,
        month: req.body.month,
        year: req.body.year,
        status: req.body.status,
        amount: req.body.amount,
        ordersPerMonth: req.body.ordersPerMonth

    })
    bill = await bill.save();

    if(!bill)
    return res.status(400).send('the bill cannot be added!')

    res.send(bill);
})


module.exports = router;