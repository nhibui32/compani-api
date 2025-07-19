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

// add salary record, this one can only add 1 record
// router.post('/', async(req, res)=>{
//     const {idSalaries, idEmployees, amount, fromDate, toDate} = req.body;

//     if(!idSalaries || !idEmployees || !amount || !fromDate || !toDate){
//         return res.status(400).json({error: 'id salaries, id employees, amount, from Date to Date are required'});
//     }

//     try{
//         const[result] = await db.query(
//             'INSERT INTO Salaries (idSalaries, idEmployees, amount, fromDate, toDate) VALUES (?, ?, ?, ?, ?)', [idSalaries, idEmployees, amount, fromDate, toDate]
//         );
//         res.json({message: 'Salary update successfully'})
//     }catch(err){
//         res.status(500).json({error: err.message})
//     }
// })


// this can add either single or an array of salary record
router.post('/', async (req, res) => {
  const data = req.body;

  // Normalize to array: if single object, wrap it into an array
  const salaries = Array.isArray(data) ? data : [data];

  // Validate each salary object
  for (const salary of salaries) {
    const { idSalaries, idEmployees, amount, fromDate, toDate } = salary;
    if (!idSalaries || !idEmployees || !amount || !fromDate || !toDate) {
      return res.status(400).json({
        error: "Each salary object must have idSalaries, idEmployees, amount, fromDate, and toDate"
      });
    }
  }

  try {
    await Promise.all(
      salaries.map(({ idSalaries, idEmployees, amount, fromDate, toDate }) =>
        db.query(
          'INSERT INTO Salaries (idSalaries, idEmployees, amount, fromDate, toDate) VALUES (?, ?, ?, ?, ?)',
          [idSalaries, idEmployees, amount, fromDate, toDate]
        )
      )
    );

    res.json({ message: `${salaries.length} salary record(s) added successfully` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// put (update) a salary 
router.put('/:idSalaries', async(req, res)=>{
    const{idSalaries} = req.params;
    const{idEmployees, amount, fromDate, toDate} = req.body;
    if(!idEmployees || !amount || !fromDate || !toDate){
        return res.status(400).json({error: "id employees, amount, from date to date are required"})
    };

    try{
        const[result] = await db.query(
            'UPDATE Salaries SET idEmployees = ?, amount = ? , fromDate = ? , toDate = ? WHERE idSalaries = ? ', [idEmployees, amount, fromDate, toDate, idSalaries]
        );

        if(result.affectedRows === 0){
            return res.status(404).json({error: 'Salaries are not found'});
        }
        res.json({message: 'Salary updated successfully'})
    }catch(err){
        res.status(500).json({error: err.message})
    }
})

//delete a salary 
router.delete('/:idSalaries', async(req,res)=>{
    const {idSalaries} = req.params;

    try{
        const[results] = await db.query('DELETE FROM Salaries WHERE idSalaries= ? ', [idSalaries]);

        if(results.affectedRows === 0){
            return res.status(404).json({error: 'Salary not found'});
        }
        res.json({message: 'Salary deleted successfully'});
    }catch(err){
        res.status(500).json({error: err.message});
    }
})

module.exports = router