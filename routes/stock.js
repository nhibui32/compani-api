const express = require('express');
const router = express.Router();
const db = require('../db')

// get all the stock information 
router.get('/', async(req, res)=>{
    try{
        const[rows] = await db.query('SELECT * FROM Stock');
        res.json(rows)
    }catch(err){
        res.status(500).json({error: err.message})
    }
})

// get all the stock for a product 
router.get('/:idProduct', async(req , res)=>{
    const{idProduct} = req.params;
    try{
        const [rows] = await db.query('SELECT * FROM Stock WHERE idProduct = ?', [idProduct])
        res.json(rows)
    }catch(err){
        res.status(500).json({error: err.message})
    }
})

// add a stock record 
router.post('/', async(req , res)=>{
    const{idStock, idProduct, quantity, lastUpdate} = req.body;
    if(!idStock || !idProduct || !quantity || !lastUpdate){
        return res.status(400).json({error: "Stock id, product id, quantity, last update are required"})
    };

    try{
        const[result] = await db.query("INSERT INTO Stock (idStock, idProduct, quantity, lastUpdate) VALUE (?, ?, ?, ?)", [idStock, idProduct, quantity, lastUpdate]);
        res.status(201).json({idStock, idProduct, quantity, lastUpdate})
    }catch(err){
        res.status(500).json({error: err.message})
    }
})

// update stock quantity
router.put('/:idProduct', async(req , res)=>{
    const {idProduct} = req.params;
    const{idStock, quantity, lastUpdate} = req.body;
    try{
        const[results] = await db.query('UPDATE Stock Set idProduct = ? , quantity = ?, lastUpdate = ? WHERE idProduct = ?' , [idStock, quantity, lastUpdate, idProduct]);
        if(results.affectedRows == 0){
            return res.status(404).json({error: "not update anything"})
        }
        res.json({message : "Updated Successfully"})
    }catch(err){
        res.status(500).json({error: err.message})
    }
})

//delete stock info
router.delete('/:idProduct', async(req , res)=>{
    const{idProduct} = req.params;
    try{
        const[result] = await db.query('DELETE FROM Stock WHERE idProduct = ?', [idProduct])
        if(result.affectedRows == 0){
            return res.status(404).json({error: "Stock not found"})
        }
        res.json({message: "Deleted successfully"})
    }catch(err){
        res.status(500).json({error: err.message})
    }
})
module.exports = router
