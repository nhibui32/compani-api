const express = require('express')
const router = express.Router();
const db = require('../db');

// get list all products 
router.get('/', async(req, res)=>{
    try{
        const[rows] = await db.query('SELECT * FROM Product');
        res.json(rows)
    }catch(err){
        res.status(500).json({error: err.message})
    }
});

//get a specific product
router.get('/:idProduct', async(req,res)=>{
    const {idProduct} = req.params;
    try{
        const [rows] = await db.query('SELECT * FROM Product WHERE idProduct = ? ', [idProduct]);
        if(rows.length === 0){
            return res.status(404).json({error: 'Product not found'})
        }
        res.json(rows)
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

// post either a product or a list(array) of products
router.post('/', async(req,res)=>{
    const data = req.body;

    // Normalize to array: if single object, wrap it into array 
    const products = Array.isArray(data) ? data : [data];

    // Validate each salary object 
    for(const product of products){
        const{idProduct, name, category, price} = product;
        if(!idProduct || !name || !category || !price){
            return res.status(400).json({error: "each product object must have id product, name, category, price"})
        }
    }

    try{
        await Promise.all(
            products.map(({idProduct, name, category, price})=>
                db.query(
                    'INSERT INTO Product (idProduct, name, category, price) VALUES (?, ?, ?, ?)', [idProduct, name, category, price]
                )
            )
        );
        res.json({message: `${products.length} products record(s) added successfully`})
    }catch(err){
        res.status(500).json({error: err.message});
    }
})

// put method. update a product 
router.put('/:idProduct', async(req,res)=>{
    const{idProduct} = req.params;
    const{name, category, price} = req.body;
    if(!name || !category || !price){
        return res.status(400).json({error: 'name, category, and price are required'})
    };

    try{
        const[result] = await db.query(
            'UPDATE Product SET name = ?, category = ?, price = ? WHERE idProduct = ?', [name, category, price, idProduct]
        );

        if(result.affectedRows === 0){
            return res.status(404).json({error: 'product not found'})
        }

        res.json({message: 'products updated successfully'})
    }catch(err){
        res.status(500).json({error: err.message})
    }
})

// delete a product
router.delete('/:idProduct', async(req, res)=>{
    const{idProduct} = req.params;

    try{
        const [results] = await db.query('DELETE FROM Product WHERE idProduct = ?', [idProduct]);

        if(results.affectedRows === 0){
            return res.status(404).json({error: 'product not found'});
        }

        res.json({message: 'product deleted successfully'})
    }catch(err){
        res.status(500).json({error: err.message})
    }
})
module.exports = router