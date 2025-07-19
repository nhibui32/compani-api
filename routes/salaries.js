const express = require('express')
const router = express.Router();
const db = require('../db');



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

// get all salaries for an employee 
router.get('/', async(req, res)=>{
    const{idEmployees} = req.query;
    try{
        let query = 'SELECT * FROM Salaries ';
        let params = [];

        if(idEmployees){
            query += 'WHERE idEmployees = ?';
            params.push(idEmployees);
        }

        const [rows] = await db.query(query , params);
        res.json(rows);
    }catch(err){
        res.status(500).json({error: err.message})
    }
})


module.exports = router