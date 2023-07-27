
const { Schema, SchemaTypes, model } = require('mongoose');

/*
    TODO:   Complete the productSchema which will contain the following 
            information about a Product:
                serialno - String, and should be required. There cannot more 
                    than one instance of the same serial number saved in the database.
                name -  String, and should be required. Refers to the name of the product
                    registered.
                date -  Date, and should be required. Refers to the purchase date of registered
                    product.
                status - String, and should be required. Refers to the shipping status of registered
                    product. Its can only be either 'Processing', 'Shipped', or 'Delivered'. All Products
                    upon creation should have the value 'Processing'.
*/
const productSchema = new Schema({
    // your code here
    serialno: {
        type: SchemaTypes.String,
        required: true,
        unique: true
    },
    name: {
        type: SchemaTypes.String,
        required: true
    },
    date: {
        type: SchemaTypes.Date,
        required: true
    },
    status: {
        type: SchemaTypes.String,
        required: true,
        enum: ['Processing', 'Shipped', 'Delivered'], //enum is used to make it only processing shipped or delivered
        default: 'Processing'
    }
    
});

const Product = model('product', productSchema); 

module.exports = Product;
