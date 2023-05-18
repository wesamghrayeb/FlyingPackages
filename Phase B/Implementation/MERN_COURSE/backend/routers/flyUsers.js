const {flyUser} = require('../models/flyUser');
const {Supplier} = require('../models/Supplier');
const {Courier} = require('../models/Courier');
const express = require('express');
const jwt = require('jsonwebtoken');

//const { OrderItem } = require('../models/oreder-item');
const router = express.Router();

var isEmpty = function(obj) {
    return JSON.stringify(obj) === '[]';
}
/**
 * handling the post request of adding a new user:
 * http://localhost:3000/api/v1/flyUsers ||| POST
 * defining an object (flyUser) by taking the info from the req.body
 * await for saving in the database
 * then send the res
 */
router.post('/', async (req,res)=>{
    const user = await flyUser.findOne({email: req.body.email})
    if(!user){
        let flyUuser = new flyUser({
            id: req.body.id,
            email: req.body.email,
            userName: req.body.userName,
            password: req.body.password,
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            role: req.body.role,
        })
        flyUuser = await flyUuser.save();

        if(!flyUuser)
        return res.status(400).send('the user cannot be added!') // 400 for error in creating the object

    res.send(flyUuser);
}
else{
    res.status(400).send('the user existed')
}

})



router.post('/login', async (req, res) => {
    console.log(req.body);
    const user = await flyUser.findOne({ email: req.body.email });
    const secret = process.env.secret;
    if (!user) {
      return res.status(400).send('The user not found');
    }
  
    // Generate a token with our secret
    const token = jwt.sign({ userId: user._id, role: user.role }, secret, { expiresIn: '1h' });
  
    // Send the token and user data in the response
    res.status(200).send({ token, user });
  });

router.get('/get/count', async (req, res) =>{
    const userCount = await flyUser.countDocuments({}).exec();

    if(!userCount){
        res.status(500).json({succes: false}) // error in counting the object in the database
    }
    res.send({
        userCount: userCount});
})

router.get('/:id', async(req,res)=>{
    let [isItSupplier, isItCourier] = await Promise.all([Supplier.find({user : req.params.id}), Courier.find({user : req.params.id})]);

    if(!isEmpty(isItSupplier)){
        res.status(200).send('Supplier');
        return;
    }
    if(!isEmpty(isItCourier)) {
        res.status(200).send('Courier');
        return;
    }
    res.status(500).json({message: 'The user with the given ID was not found'})
})





module.exports = router;

/**  
 * creating a new flyOrder this is the body of the request
 * that have all the information that required to create a new order :-
 * 
 *  { 
    "id": "1",
    "email": "wes.gh@gmail.com",
    "userName": "weso",
    "password": "123",
    "phone": "0584652145",
    "isAdmin": "false"
   } */
