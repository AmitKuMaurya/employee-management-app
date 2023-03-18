const { EmployeeModel } = require("../models/employee.model");
const cloudinary = require("cloudinary");
const asyncAwaitErr = require("../middlewares/async.await");
const ErrorHandler = require("../middlewares/ErrorHandlers");
require("dotenv").config();


const getEmployees = async (req, res) => {
  const employees = await EmployeeModel.find();
  try {
    res.status(201).json({
      success: true,
      employees,
    });
  } catch (error) {
    res.send({ error: "Can't get employee for you" });
  }
};

const createEmployees = asyncAwaitErr(async (req, res) => {
  
  const { username,email,phone,status,gender} = req.body;
  
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });


    const employee = await EmployeeModel.create({
      username,
      email,
      phone,
      status,
      gender,
      avatar:{
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });
    // try {
      res.status(201).json({
        success: true,
        employee,
      });
    // } catch (error) {
      // res.send({ error: "Failed to Upload Employee Details." });
      // console.log(error);
    // }
});

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


const deleteEmployee = asyncAwaitErr(async (req, res, next) => {
  const employee = await EmployeeModel.findByIdAndRemove(req.params.id);

  if (!employee){
    return next(new ErrorHandler("employee not found", 404));
  }

  res.status(201).json({
    success: true,
    message: "Employee got deleted",
  });
});



 const getDetailedEmployee = async (req, res, next) => {
  const employee = await EmployeeModel.findById(req.params.id);

  if (!employee) {
    return next("employee not found");
  }

  res.status(201).json({
    success: true,
    employee,
  });
};

module.exports = {
  getEmployees,
  createEmployees,
  updateEmployee,
  deleteEmployee,
  getDetailedEmployee
};
