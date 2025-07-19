const express = require('express');
const router = express.Router();
const db = require('../db')

// // get all employees 
// router.get('/', async(req, res) =>{
//     try{
//         const [rows] = await db.query('SELECT * FROM Employees');
//         res.json(rows)
//     }catch(err){
//         res.status(500).json({error: err.message});
//     }
// })

// we don't need this because we have the filtering function below

// get employees by ids 
router.get('/:idEmployees', async(req, res)=>{
    const {idEmployees} = req.params;
    try{
        const [rows] = await db.query('SELECT * FROM Employees WHERE idEmployees = ?', [idEmployees]);
        if (rows.length === 0 ){
            return res.status(404).json({error: 'Employees with this id not found'})
        }
        res.json(rows)
    }catch(err){
        res.status(500).json({error: err.message})
    }
})


// GET all employees or filter by idDepartment
router.get('/', async (req, res) => {
  const { idDepartment } = req.query;

  try {
    let query = 'SELECT * FROM Employees';
    let params = [];

    if (idDepartment) {
      query += ' WHERE idDepartment = ?';
      params.push(idDepartment);
    }

    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// post a new employees 
router.post('/', async(req, res)=>{
    const {idEmployees, name, email, idDepartment, hireDate} = req.body;
    if (!idEmployees || !name || !email || !idDepartment || !hireDate) {
        return res.status(400).json({error: 'id employee, name, email, id department and hire date are required'});
    }

    try{
        const [result] = await db.query(
            'INSERT INTO Employees (idEmployees, name, email, idDepartment, hireDate) VALUES ( ?, ?, ?, ?, ?)', [idEmployees, name, email, idDepartment, hireDate]
        );
        res.status(201).json({idEmployees, name, email, idDepartment, hireDate})
    }catch(err){
        res.status(500).json({error: err.message})
    }
})

// put (update) an employees
router.put('/:idEmployees', async(req, res)=>{
    const{idEmployees} = req.params;
    const{name, email, idDepartment, hireDate} = req.body;
    if( !name || !email || !idDepartment || !hireDate){
        return res.status(400).json({error: "name, email, id department, hire date are required"})
    };

    try{
        const [result] = await db.query(
            'UPDATE Employees SET name = ?, email =?, idDepartment = ?, hireDate = ? WHERE idEmployees = ?', [name, email, idDepartment, hireDate, idEmployees]
        );
        if(result.affectedRows === 0){
            return res.status(404).json({error: 'Employees not found'});
        }
        res.json({message: 'Employee updated successfully'})
    }catch(err){
        res.status(500).json({error: err.message})
    }
})


// delete an employee 
router.delete('/:idEmployees', async(req, res)=>{
    const {idEmployees} = req.params;

    try{
        // Step 1: Delete related salary records
        await db.query('DELETE FROM Salaries WHERE idEmployees = ?', [idEmployees]);

        // Step 2: Delete the employee
        const [results] = await db.query('DELETE FROM Employees WHERE idEmployees = ?', [idEmployees]);

        if(results.affectedRows === 0){
            return res.status(404).json({error: 'Employee not found'});
        }
        res.json({message: 'Employee deleted successfully'});
    }catch(err){
        res.status(500).json({error: err.message});
    }
});
module.exports = router