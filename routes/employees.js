const express = require('express');
const router = express.Router();
const db = require('../db')

// get all employees 
router.get('/', async(req, res) =>{
    try{
        const [rows] = await db.query('SELECT * FROM Employees');
        res.json(rows)
    }catch(err){
        res.status(500).json({error: err.message});
    }
})

// get employees by ids 
router.get('/:idEmployees', async(req, res)=>{
    const {idEmployees} = req.params;
    try{
        const [rows] = await db.query('SELECT * FROM Employees WHERE idEmployees = ?', [idEmployees]);
        if (rows.length === 0 ){
            return res.status(400).json({error: 'Employees with this id not found'})
        }
        res.json(rows[0])
    }catch(err){
        res.status(500).json({error: err.message})
    }
})

module.exports = router