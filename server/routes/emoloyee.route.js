const {Router} = require("express");
const { getEmployees, createEmployees, updateEmployee, deleteEmployee } = require("../controller/employee.controller");

const employeeRouter = Router();

employeeRouter.get("/employee",getEmployees);
employeeRouter.post("/create/employee",createEmployees);
employeeRouter.put("/update/employee/:id",updateEmployee);
employeeRouter.delete("/delete/employee/:id",deleteEmployee);
// employeeRouter.delete("/employee",)

module.exports = {
    employeeRouter
}