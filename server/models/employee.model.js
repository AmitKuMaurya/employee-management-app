const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  status: { type: String, required: true },
  image: { type: String, required: true },
  gender: { type: String, required: true },
});

const EmployeeModel = mongoose.model("employee", employeeSchema);

module.exports = {
  EmployeeModel,
};
