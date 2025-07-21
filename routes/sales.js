const express = require('express')
const router = express.Router();
const db = require('../db');

// // get method. get all the sale 
// router.get('/', async(req,res)=>{
//     try{
//         const[rows] = await db.query('SELECT * FROM Sales')
//         res.json(rows)
//     }catch(err){
//         res.status(500).json({error: err.message})
//     }
// })

// get method.  get a specific sale
router.get('/:idSales', async(req,res)=>{
    const {idSales} = req.params;
    try{
        const[rows] = await db.query('SELECT * FROM Sales WHERE idSales = ?', [idSales]);
        if(rows.length === 0){
            return res.status(404).json({error: ' Sales not found'});
        };
        res.json(rows)

    }catch(err){
        res.status(500).json({error: err.message})
    }
})

// get sales by employees
router.get('/', async(req,res)=>{
    const {idEmployees, idProduct} = req.query;
    try{
        let query = 'SELECT * FROM Sales';
        let conditions = [];
        let params = [];

        if (idEmployees) {
            conditions.push('idEmployees = ?');
            params.push(idEmployees);
        }

        if (idProduct) {
            conditions.push('idProduct = ?');
            params.push(idProduct);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        const [rows] = await db.query(query, params);
        res.json(rows);
    }catch(err){
        res.status(500).json({error: err.message})
    }
})

// record a new sale
router.post('/', async(req,res)=>{
    const {idSales, idProduct, idEmployees, quantity, saleDate} = req.body;
    if(!idSales || !idProduct || !idEmployees || !quantity || !saleDate){
        return res.status(400).json({error :' id Sales, id Product, id employees, quantity, and sale date are required'});
    }

    try{
        const[result]= await db.query('INSERT INTO Sales (idSales, idProduct, idEmployees, quantity, saleDate) VALUES (?, ?, ?, ?, ?)', [idSales, idProduct, idEmployees, quantity, saleDate]);
        res.status(201).json({idSales, idProduct, idEmployees, quantity, saleDate})
    }catch(err){
        res.status(500).json({error: err.message})
    }
})

// update a sale
router.put('/:idSales', async(req,res)=>{
    const{idSales} = req.params;
    const{idProduct, idEmployees, quantity, saleDate} = req.body
    if(!idProduct || !idEmployees || !quantity || !saleDate){
        return res.status(400).json({error: 'id Product, id employees, quantity, and sale date are required'})
    }
    try{
        const[result] = await db.query('UPDATE Sales SET idProduct = ?, idEmployees = ?, quantity = ?, saleDate = ? WHERE idSales = ?', [idProduct, idEmployees, quantity, saleDate, idSales])
        if(result.affectedRows === 0){
            return res.status(404).json({error: 'sales not found'})
        }
        res.json({message: 'Sales updated successfully'})
    }catch(err){
        res.status(500).json({error: err.message})
    }
})


// delete a sale
router.delete('/:idSales', async(req,res)=>{
    const {idSales} = req.params;
    try{
        const [result] = await db.query('DELETE FROM Sales WHERE idSales = ?', [idSales])

        if(result.affectedRows === 0){
            return res.status(404).json({error: 'sales not found'})
        }
        res.json({message: 'sales deleted successfully'})
    }catch(err){
        res.status(500).json({error: err.message})
    }
})
module.exports = router