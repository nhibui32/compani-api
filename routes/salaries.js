const express = require('express')
const router = express.Router();
const db = require('../db');

// get all the salaries record 
router.get('/', async(req, res)=>{
    try{
        const [rows] = await db.query('SELECT * FROM Salaries');
        res.json(rows)
    }catch(err){
        res.status(500).json({error: err.message});
    }
})

// get salary by id 
router.get('/:idSalaries', async(req,res)=>{
    const {idSalaries} = req.params
    try{
        const[rows] = await db.query('SELECT * FROM Salaries WHERE idSalaries = ?', [idSalaries]);
        if(rows.length === 0){
            return res.status(404)({error: 'Salary not found'})
        }
        res.json(rows)
    }catch(err){
        res.status(500).json({error:err.message})
    }
})

// // get all salaries for an employees 
// router.get('/:idEmployees')

module.exports = router