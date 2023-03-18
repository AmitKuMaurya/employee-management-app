const {Router} = require("express");
const { getEmployees, createEmployees, updateEmployee, deleteEmployee, getDetailedEmployee } = require("../controller/employee.controller");

const employeeRouter = Router();

employeeRouter.get("/employee",getEmployees);
employeeRouter.get("/employee/:id",getDetailedEmployee);
employeeRouter.post("/create/employee",createEmployees);
employeeRouter.put("/update/employee/:id",updateEmployee);
employeeRouter.delete("/delete/employee/:id",deleteEmployee);

module.exports = {
    employeeRouter
}