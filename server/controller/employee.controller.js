const { EmployeeModel } = require("../models/employee.model");
const cloudinary = require("cloudinary");
require("dotenv").config();
const getEmployees = async (req, res) => {
  const employee = await EmployeeModel.find();
  try {
    res.status(201).json({
      success: true,
      employee,
    });
  } catch (error) {
    res.send({ error: "Can't get employee for you" });
  }
};

const createEmployees = async (req, res) => {
  const { username, email, phone, status, avatar, gender } = req.body;
  console.log(email);

  const userExist = EmployeeModel.findOne({ email });
  if (userExist) {
    res.send({ msg: "This employee is already exists." });
  } else {
    const employee = await EmployeeModel.create({
      username,
      email,
      phone,
      status,
      gender,
      avatar,
    });
    try {
      res.status(201).json({
        success: true,
        employee,
      });
    } catch (error) {
      res.send({ error: "Failed to Upload Employee Details." });
      console.log(error);
    }
  }
};

const updateEmployee = async (req, res, next) => {
  // const {id} = req.params
  const newUserData = {
    name: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    status: req.body.status,
    avatar: req.body.avatar,
    gender: req.body.gender,
  };
  let employee = EmployeeModel.findById(req.params.id);

  if (!employee) {
    return next(`employee does not exist with id : ${req.params.id}`);
  }

  employee = await EmployeeModel.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  try {
    res.status(200).json({
      success: true,
      employee,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteEmployee = async (req,res,next) => {
    const employee = await EmployeeModel.findOneAndDelete(req.params.id);
  
    res.status(200).json({
      success: true,
      message : "employee deleted"
    });
}

module.exports = {
  getEmployees,
  createEmployees,
  updateEmployee,
  deleteEmployee
};
