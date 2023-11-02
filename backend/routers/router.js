const express = require ("express");
const router = express.Router();
let verifyToken = require("../middleware/auth");

const { 
    findEmployees, 
    addEmployee, 
    updateEmployee, 
    deleteEmployee, 
} = require ("../controllers/employeeController");

//get
router.get("/employees", findEmployees);

//post
router.post("/employee/create", verifyToken, addEmployee);

//put
router.put ("/:id", updateEmployee);

//delete
router.delete("/:id", deleteEmployee);

module.exports = router;