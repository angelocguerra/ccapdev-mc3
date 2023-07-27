const { Router }= require('express');
const Product = require('../models/Product.js');

const router = Router();

/* 
    TODO:   This request handler listens for GET requests to the path `/`.
            This displays `index.hbs` with all the products currently stored
            in the database.
*/
router.get('/', async function(req, res) {
    // your code here
    const data = await Product.find({}).lean().exec();
    console.log(data);

    res.render('index', {
        products: data
    });

    console.log('index is shown')
    //res.render('index'); // This is to load the page initially. You are expected to eventually replace this line with your own code.
});

/*
    TODO:   This function is executed when the client sends a GET request
            to path `/checkSerialno`. This function checks if a specific 
            serial number is stored in the database. It then informs 
            the client whether the serial number already exists or not.
*/
router.get('/checkSerialNo', async function(req, res) {
    // your code here
    const serialno = req.query.serialno;
    console.log(serialno);

    const foundData = await Product.findOne({serialno: serialno}).exec();
    console.log(foundData);

    if(foundData){
        res.sendStatus(400);
    }else{
        res.sendStatus(200);
    }
});

/*  
    TODO:   This function is executed when the client sends a POST request
            to path `/register`. This function saves the product information
            sent by the client to the database, then informs the client
            whether the operation was successful or not.
*/
router.post('/register', async function(req, res) {
    // your code here
    console.log(req.body);

    const newProduct = new Product({
        serialno: req.body.serialno,
        name: req.body.name,
        date: req.body.date,
        status: req.body.status
    });

    try {
        const result = await newProduct.save();
        console.log(result);
        res.sendStatus(200);
    } catch (err) {
        console.log('Saving Transaction Failed: ');
        console.log(err);
        res.sendStatus(400);
    }
});



/*
    TODO:   This function is executed when the client sends a POST request
            to path `/update`. This function updates the shipping status of 
            a product as specified by the request's serial number field. 

            If the product with the given serial number exists, the function
            then updates the status field with the new status value supplied 
            from the request body. Finally, the function informs the client
            that the operation was successful.

            Otherwise, if no such product with the given serial number exists,
            it informs the client that the operation cannot be performed.  
*/
router.post('/update', async function(req, res) {
    // your code here
});

module.exports = router;
